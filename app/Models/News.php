<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'summary','description', 'date','youtube_url', 'image', 'status'];

    protected $appends = ['image_url'];

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = Str::slug($value);
    }

    public function getImageUrlAttribute()
    {
        if($this->image){
            return asset('storage/assets/images/news/' . $this->image);
        }
    }

    protected static function boot()
    {
        parent::boot();

        // Listen for the 'creating' event and generate slug from the title
        static::creating(function ($news) {
            $news->slug = Str::slug($news->title);
        });
    }

    public static function getRules($id = null)
    {
        return [
            'title' => 'required|unique:news,title,' . $id . '|max:255',
            'slug' => 'unique:news,slug,' . $id . '|alpha_dash|max:255',
            'summary' => 'nullable',
            'description' => 'nullable',
            'youtube_url' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'date' => 'nullable|date',
            'status' => 'in:draft,published',
        ];
    }
}
