<?php

namespace App\Http\Middleware;

use App\Models\Account;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class Authorization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = explode(' ',$request->header('Authorization') )[1];
        $account = Account::where('access_token', '=', $token)->first();
        $user = User::find($account->user_id);
        $request->merge(['user_id'=> $user->id]);
        $request->merge(['user_name'=> $user->name]);
        $request->merge(['user_image'=> $user->image]);
        return $next($request);
    }
}
