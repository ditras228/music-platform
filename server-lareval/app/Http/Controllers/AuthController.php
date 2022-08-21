<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|User[]
     */
    public function index()
    {
        return User::all();
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
                'name' => ['required'],
                'password' => ['required']
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $user =  User::where('name', $request->name)->first();

        if (Hash::check($request->password, $user->password)) {
            $account = Account::where('user_id',$user->id)->first();
            $user->access_token = $account->access_token;

        }else{
            dd('Неверный пароль');
        }



        return $user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse|Response|object
     */
    public function registerUser(Request $request)
    {
        $validator = Validator::make(
            $request->all(), [
                'name' => ['required'],
                'password' => ['required'],
                'email' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $user =  User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email'=> $request->email
        ]);


        $account = Account::create([
            'user_id' => $user->id,
            'access_token' => Str::random(60)
        ]);

        $user->access_token = $account->access_token;

        Mail::send(['text'=> 'mail'], ['name', 'Подтверждение регистрации'], function($message){
            $message->to('misteranonimus555@gmail.com','To dev blog')-> subject('Подтверждение регистрации');
            $message->from('ditras@druzhinindmitry.ru','To dev blog');


        });
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function show($id)
    {
        $user = DB::table('users')
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->select('users.*', 'accounts.access_token')
            ->where('users.id', $id)
            ->get()
            ->first();

        if(!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ])->setStatusCode(404);
        }
        return $user;
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
                'image' => ['required, image'],
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages()
            ])->setStatusCode(422);
        }

        $user = User::find($id);

        $image = $request->file('image');
        $imagePath = $image->store('avatars');


        if (Storage::exists($user->image)) {
            Storage::delete($user->image);
        } else {
            dd('Image does not exists.');
        }

        $user->update([
            'image' => $imagePath,
        ]);
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse|Response|object
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ])->setStatusCode(404);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'Success delete'
        ])->setStatusCode(200);
    }
}
