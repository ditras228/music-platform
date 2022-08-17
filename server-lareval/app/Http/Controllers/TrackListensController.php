<?php

namespace App\Http\Controllers;

use App\Models\Track;

class TrackListensController extends Controller
{
    public function update(int $id)
    {
        $track = Track::find($id);
        $track->increment('listens');
        return $track->listens;
    }
}
