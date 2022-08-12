<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\AlbumTrack;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Album[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Http\Response
     */
    public function index()
    {
        return Album::all();;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object
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

        $image = $request->file('image');
        $imagePath = $image->store('tracks');

        $albumTrack = array();
        foreach($request->tracks as $track){
            $albumTrack[$track] = ['album_id'=>$request->id, 'track_id'=>$track];
        }

        AlbumTrack::insert($albumTrack);

        return Track::create([
            'user_id'=> 1,
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object
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
        return $album;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object
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

        $album = Album::find($id);

        $image = $request->file('image');
        $imagePath = $image->store('tracks');


        if(Storage::exists($album->image)){
            Storage::delete($album->image);
        }else{
            dd('Image does not exists.');
        }

        $albumTrack = array();
        foreach($request->tracks as $track){
            $albumTrack[$track] = ['album_id'=>$request->id, 'track_id'=>$track];
        }

        AlbumTrack::insert($albumTrack);

        $album->update([
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

        return $track;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object
     */
    public function destroy( $id)
    {
        $album = Album::find($id);

        if(!$album){
            return response()->json([
                'status' => false,
                'message' => 'Track not found',
            ])->setStatusCode(404);
        }

        if(Storage::exists($album->image)){
            Storage::delete($album->image);
        }else{
            dd('Image does not exists.');
        }

        $album->delete();

        return response()->json([
            'status'=> true,
            'message'=> 'Success delete'
        ])->setStatusCode(200);
    }


}
