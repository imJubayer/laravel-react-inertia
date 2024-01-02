<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $newses = News::latest()->get();
        return Inertia::render('News/index', [
            'newses' => $newses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate(News::getRules());
            if($request->image){
                $imageName = saveImage($request->file('image'), 'news');
                $validatedData['image'] = $imageName;
            }
            $news = News::create($validatedData);

            return redirect()->back()->with('success', true);
            // dd($news);
            // session()->flash('success', 'News successfully added!');
            // return redirect()->route('news.index');
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            $firstError = $e->validator->errors()->first();
            // return redirect()->back()->with('error', $firstError)->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        //
    }

    public function changeStatus(News $news)
    {
        $news->status = $news->status === 'draft' ? 'published' : 'draft';
        $news->save();
    }
}
