<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
class Album extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'albums';
    protected $guarded = [];

    public function tracks(): BelongsToMany
    {
        return $this->belongsToMany(Track::class);
    }
}
