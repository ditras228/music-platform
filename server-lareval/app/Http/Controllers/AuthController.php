<?php

namespace App\Http\Controllers;

use App\Mail\newMail;
use App\Models\Account;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function loginUser(Request $request)
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

        $user = User::where('name', $request->name)->first();

        if (Hash::check($request->password, $user->password)) {
            $account = Account::where('user_id', $user->id)->first();
            $user->access_token = $account->access_token;

        } else {
            return response()->json([
                'status' => false,
                'errors' => 'Не правильный пароль'
            ])->setStatusCode(102);
        }
        return $user;
    }

    public function getUser(int $id)
    {
        $user = DB::table('users')
            ->join('accounts', 'users.id', '=', 'accounts.user_id')
            ->select('users.name', 'users.id', 'accounts.access_token')
            ->where('users.id', $id)
            ->get()
            ->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
            ])->setStatusCode(404);
        }
        return $user;
    }
}
