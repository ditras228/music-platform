<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Comment;
use App\Models\Track;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'text' => ['required'],
            ]
        );

        if(!$request->track_id && !$request->album_id){
            return response()->json([
                'status' => false,
                'errors' => 'Не указан трек или альбом'
            ])->setStatusCode(404);
        }

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        if ($request->track_id) {
            $track = Track::find($request->track_id);

            if ($track == null) {
                return response()->json([
                    'status' => false,
                    'errors' => 'Track not found'
                ])->setStatusCode(404);
            }
        }

        if ($request->album_id) {
            $album = Album::find($request->album_id);

            if ($album == null) {
                return response()->json([
                    'status' => false,
                    'errors' => 'Album not found'
                ])->setStatusCode(404);
            }
        }

        $comment = Comment::create([
            'user_id' => $request->user_id,
            'text' => $request->text,
            'track_id' => $request->track_id,
            'album_id' => $request->album_id,
        ]);
        $comment->name = $request->user_name;
        $comment->image = $request->user_image;

        return $comment;
    }


    public function update(Request $request, int $id)
    {
        $validator = Validator::make(
            $request->all(), [
                'text' => ['required'],
                'track_id' => ['required']
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $comment = Comment::find($id);
        $comment->update([
            'text' => $request->text,
        ]);

        return $comment;

    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'status' => false,
                'message' => 'Comment not found',
            ])->setStatusCode(404);
        }

        $comment->delete();

        return response()->json([
            'status' => true,
            'message' => 'Success delete'
        ])->setStatusCode(200);
    }


}
