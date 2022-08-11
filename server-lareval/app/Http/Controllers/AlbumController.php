<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function index(){
        $album = Album::all();
        dd($album);
    }

    public function create(){

    }

    public function update(){

    }

    public function delete(){

    }
}
