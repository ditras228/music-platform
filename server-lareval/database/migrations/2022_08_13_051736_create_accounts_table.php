<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('compound_id')->nullable();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');;
            $table->string('provider_type')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('provider_account_id')->nullable();
            $table->string('refresh_token')->nullable();
            $table->string('access_token')->nullable();
            $table->timestamp('access_token_expires')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
