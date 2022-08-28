<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $albums = Album::where('name', 'ILIKE', "%{$search}%")->paginate(15);

        foreach($albums as $newAlbums){
            $newAlbums->page = $albums->currentPage();
        }
        return $albums;
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => ['required'],
                'author' => ['required'],
                'image' => ['required', 'image'],
                'tracks' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $tracks = json_decode($request->tracks);
        $existTrackCount = Track::findMany($tracks)->count();
        if ($existTrackCount !== count($tracks)) {
            return response()->json([
                'status' => false,
                'message' => 'Tracks not found',
            ])->setStatusCode(404);
        }

        $image = $request->file('image');
        $imagePath = $image->store('albums', 'public');

        $album = Album::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

        $albumTracks = [];
        $currentTime = now();

        foreach ($tracks as $track) {
            $albumTracks[$track] = [
                'album_id' => $album->id,
                'track_id' => $track,
                'updated_at' => $currentTime,
                'created_at' => $currentTime
            ];
        }

        $album->tracks()->attach($albumTracks);

        return $album;

    }

    public function show($id)
    {
        $album = Album::where('id', $id)->first();
        $tracks =  $album->tracks()->paginate(15);

        $comments = DB::table('comments')
            ->join('users', 'users.id', '=', 'comments.user_id')
            ->select('name', 'image', 'text')
            ->where('comments.album_id', '=', $id)
            ->orderBy('comments.id', 'desc')
            ->paginate(15);


        $album['comments'] = $comments;

        foreach($tracks as $newTracks){
            $newTracks->page = $tracks->currentPage();
        }
        $album['tracks'] = $tracks;
        return $album;
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => ['required'],
                'author' => ['required'],
                'image' => ['required', 'image'],
                'tracks' => ['required', 'array'],
                'tracks.*' => ['int'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $existTrackCount = Track::findMany($request->tracks)->count();

        if ($existTrackCount !== count($request->tracks)) {
            return response()->json([
                'status' => false,
                'message' => 'Tracks not found',
            ])->setStatusCode(404);
        }

        $album = Album::find($id);

        $image = $request->file('image');
        $imagePath = $image->store('albums', 'public');


        if (Storage::exists($album->image)) {
            Storage::delete($album->image);
        } else {
            dd('Image does not exists.');
        }

        $album->update([
            'name' => $request->name,
            'author' => $request->author,
            'image' => $imagePath,
        ]);

        $albumTracks = [];
        $currentTime = now();
        foreach ($request->tracks as $track) {
            $albumTracks[$track] = [
                'album_id' => $album->id,
                'track_id' => $track,
                'updated_at' => $currentTime
            ];
        }

        $album->attach($albumTracks);
        return $album;

    }

    public function destroy($id)
    {
        $album = Album::find($id);

        if (!$album) {
            return response()->json([
                'status' => false,
                'message' => 'Album not found',
            ])->setStatusCode(404);
        }

        $album->delete();

        return $album->id;
    }
}
