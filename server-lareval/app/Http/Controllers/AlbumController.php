<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\AlbumTrack;
use App\Models\Track;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Album[]|Collection
     */
    public function index()
    {
        return Album::all();;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create($request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse|Response|object
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),[
                'name' => ['required'],
                'author' => ['required'],
                'image' => ['required', 'image'],
                'tracks' => ['required', 'array'],
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'errors'=> $validator->messages()
            ])->setStatusCode(422);
        }

        $existTrackCount = Track::findMany($request->tracks)->count();

        if($existTrackCount !== count($request->tracks)){
            return response()->json([
                'status' => false,
                'message' => 'Tracks not found',
            ])->setStatusCode(404);
        }

        $image = $request->file('image');
        $imagePath = $image->store('tracks');




        $album =  Album::create([
//            'user_id'=> 1,
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

        $albumTracks = [];
        $currentTime = now();
        foreach($request->tracks as $track){
            $albumTracks[$track] = ['album_id'=>$album->id, 'track_id'=>$track, 'updated_at'=> $currentTime, 'created_at'=> $currentTime];
        }

        $album->tracks()->attach($albumTracks);

        return $album;

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function show($id)
    {
        $album = Album::find($id);
        $tracks = AlbumTrack::where('album_id', $id);
        if (!$tracks) {
            return response()->json([
                'status' => false,
                'message' => 'Tracks not found',
            ])->setStatusCode(404);
        }
        $album->tracks = [];
        $album->comments = [];
        return $album;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return void
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make(
            $request->all(),[
                'name' => ['required'],
                'author' => ['required'],
                'image' => ['required', 'image'],
                'tracks' => ['required', 'array'],
                'tracks.*' => ['int'],
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'errors'=> $validator->messages()
            ])->setStatusCode(422);
        }

        $existTrackCount = Track::findMany($request->tracks)->count();

        if($existTrackCount !== count($request->tracks)){
            return response()->json([
                'status' => false,
                'message' => 'Tracks not found',
            ])->setStatusCode(404);
        }

        $album = Album::find($id);

        $image = $request->file('image');
        $imagePath = $image->store('tracks');


        if(Storage::exists($album->image)){
            Storage::delete($album->image);
        }else{
            dd('Image does not exists.');
        }

        $album->update([
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

        $albumTracks = [];
        $currentTime = now();
        foreach($request->tracks as $track){
            $albumTracks[$track] = ['album_id'=>$album->id, 'track_id'=>$track, 'updated_at'=> $currentTime];
        }

        $album->attach($albumTracks);
        return $album;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse|object
     */
    public function destroy( $id)
    {
        $album = Album::find($id);

        if(!$album){
            return response()->json([
                'status' => false,
                'message' => 'Album not found',
            ])->setStatusCode(404);
        }

        if(Storage::exists($album->image)){
            Storage::delete($album->image);
        }else{
            dd('Image does not exists.');
        }

        $album->tracks()->detach();
        $album->delete();

        return response()->json([
            'status'=> true,
            'message'=> 'Success delete'
        ])->setStatusCode(200);
    }


}
