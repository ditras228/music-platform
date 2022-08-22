<?php

namespace App\Http\Controllers;

use App\Mail\newMail;
use App\Models\Account;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
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

        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email' => $request->email
        ]);


        $account = Account::create([
            'user_id' => $user->id,
            'access_token' => Str::random(32)
        ]);

        $user->access_token = $account->access_token;

        Mail::to($user->email)->send(new newMail($user->id, $user->access_token));

        return $user;
    }

    public function registrationConfirm ( $id,  $hash){
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'status' => false,
                'errors' => 'Пользователь не найден'
            ])->setStatusCode(404);
        }

        $account = Account::where('user_id', $id)->get()->first();

        $currentTime = now();
        if($account->access_token == $hash){
            $user->update([
                'email_verified' => $currentTime
            ]);
        }else{
            return response()->json([
                'status' => false,
                'errors' => 'Токен не валиден'
            ])->setStatusCode(500);
        }
        return redirect('http://localhost:3000/');
    }
}
