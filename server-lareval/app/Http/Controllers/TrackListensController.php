<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Track;
use Illuminate\Http\Request;

class TrackListensController extends Controller
{
    public function update(int $id, Request $request)
    {
        $track = Track::find($id);

        $album_id= $request->album_id;
        if($album_id){
            $album = Album::find($album_id);

            if($album){
                $album->increment('listens');
            }
        }

        $track->increment('listens');
        return $track->listens;
    }
}
