<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Track;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class TrackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Track[]|\Illuminate\Database\Eloquent\Collection|Response
     */
    public function index()
    {
        return Track::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
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
                'user_id'=> ['required'],
                'name' => ['required'],
                'lyrics' => ['required'],
                'artist' => ['required'],
                'audio' => ['required', 'mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav'],
                'image' => ['required', 'image'],
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'errors'=> $validator->messages()
            ])->setStatusCode(422);
        }

        $image = $request->file('image');
        $audio = $request->file('audio');
        $imagePath = $image->store('tracks','public');
        $audioPath = $audio->store('audio','public');

        return Track::create([
            'user_id'=> $request->user_id,
            'name' => $request->name,
            'lyrics' => $request->lyrics,
            'artist' => $request->artist,
            'audio' => $audioPath,
            'image' => $imagePath,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function show($id)
    {
        $track = Track::find($id);
        if (!$track) {
            return response()->json([
                'status' => false,
                'message' => 'Track not found',
            ])->setStatusCode(404);
        }

        $comments = DB::table('comments')
            ->join('users','users.id','=', 'comments.user_id')
            ->select('name', 'image', 'text')
            ->where('comments.track_id', '=', $id )
            ->orderBy('comments.id', 'desc')
            ->get();

        $track['comments'] = $comments;
        return $track;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Response
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
                'lyrics' => ['required'],
                'artist' => ['required'],
                'audio' => ['required', 'mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav'],
                'image' => ['required', 'image'],
            ]
        );

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'errors'=> $validator->messages()
            ])->setStatusCode(422);
        }

        $track = Track::find($id);

        $image = $request->file('image');
        $audio = $request->file('audio');
        $imagePath = $image->store('tracks', 'public');
        $audioPath = $audio->store('audio', 'public');


        if(Storage::exists($track->image)){
            Storage::delete($track->image);
        }else{
            dd('Image does not exists.');
        }

        if(Storage::exists($track->audio)){
            Storage::delete($track->audio);
        }else{
            dd('Audio does not exists.');
        }

         $track->update([
            'name' => $request->name,
            'lyrics' => $request->lyrics,
            'artist' => $request->artist,
            'audio' => $audioPath,
            'image' => $imagePath,
        ]);

        return $track;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function destroy( $id)
    {
        $track = Track::find($id);

        if(!$track){
            return response()->json([
                'status' => false,
                'message' => 'Track not found',
            ])->setStatusCode(404);
        }

        $track->delete();

        return response()->json([
            'status'=> true,
            'message'=> 'Success delete'
        ])->setStatusCode(200);
    }


}
