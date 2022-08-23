<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class TrackController extends Controller
{
    public function streamResponse($id): BinaryFileResponse
    {
        $audioPath = Track::Find($id)->audio;
        $response = new BinaryFileResponse(
            Storage::disk('public')->path($audioPath)
        );

        BinaryFileResponse::trustXSendfileTypeHeader();

        return $response;
    }

    public function index(Request $request)
    {
        $search = $request->search;
        $tracks = Track::where('name', 'LIKE', "%{$search}%")->paginate(15);

        foreach($tracks as $newTracks){
            $newTracks->page = $tracks->currentPage();
        }
        return $tracks;
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'user_id' => ['required'],
                'name' => ['required'],
                'lyrics' => ['required'],
                'artist' => ['required'],
                'audio' => ['required', 'mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav'],
                'image' => ['required', 'image'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $image = $request->file('image');
        $audio = $request->file('audio');
        $imagePath = $image->store('tracks', 'public');
        $audioPath = $audio->store('audio', 'public');

        return Track::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'lyrics' => $request->lyrics,
            'artist' => $request->artist,
            'audio' => $audioPath,
            'image' => $imagePath,
        ]);

    }

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
            ->join('users', 'users.id', '=', 'comments.user_id')
            ->select('name', 'image', 'text')
            ->where('comments.track_id', '=', $id)
            ->orderBy('comments.id', 'desc')
            ->get();

        $track['comments'] = $comments;
        return $track;
    }

    public
    function update(Request $request, int $id)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => ['required'],
                'lyrics' => ['required'],
                'artist' => ['required'],
                'audio' => ['required', 'mimes:application/octet-stream,audio/mpeg,mpga,mp3,wav'],
                'image' => ['required', 'image'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $track = Track::find($id);

        $image = $request->file('image');
        $audio = $request->file('audio');
        $imagePath = $image->store('tracks', 'public');
        $audioPath = $audio->store('audio', 'public');


        if (Storage::exists($track->image)) {
            Storage::delete($track->image);
        }

        if (Storage::exists($track->audio)) {
            Storage::delete($track->audio);
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

    public function destroy($id)
    {
        $track = Track::find($id);

        if (!$track) {
            return response()->json([
                'status' => false,
                'message' => 'Track not found',
            ])->setStatusCode(404);
        }

        $track->delete();

        return response()->json([
            'status' => true,
            'message' => 'Success delete'
        ])->setStatusCode(200);
    }
}
