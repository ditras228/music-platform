<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Track extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table='tracks';
    protected $guarded = [];

    public function albums(): BelongsToMany
    {
        return $this->belongsToMany(Album::class);
    }
}
