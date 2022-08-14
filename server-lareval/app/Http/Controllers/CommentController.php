<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Comment;
use App\Models\Track;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Track[]|\Illuminate\Database\Eloquent\Collection|Response
     */
    public function index()
    {
        return Comment::all();
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
            $request->all(), [
                'text' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        if($request->track_id) {
            $track = Track::find($request->track_id);

            if ($track == null) {
                return response()->json([
                    'status' => false,
                    'errors' => 'Track not found'
                ])->setStatusCode(404);
            }
        }

        if($request->album_id) {
            $album = Album::find($request->album_id);

            if ($album == null) {
                return response()->json([
                    'status' => false,
                    'errors' => 'Album not found'
                ])->setStatusCode(404);
            }
        }

            return Comment::create([
            'user_id'=> 1,
            'text' => $request->text,
            'track_id'=> $request->track_id,
            'album_id'=> $request->album_id,
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return void
     */
    public function show($id)
    {

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
            $request->all(), [
                'text' => ['required'],
                'track_id'=>['required']
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

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse|object
     */
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
