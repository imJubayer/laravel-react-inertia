<?php
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

function saveImage($image, $folder = 'news')
{
    $imageName = time() . '_' . $image->getClientOriginalName();
    $image->storeAs('public/assets/images/' . $folder, $imageName);

    return $imageName;
}

function apiResponse($success, $msg, $data, $httpStatusCode=null, $meta=null){
    $response = [
        'success' => $success,
        'msg' => $msg,
        'data' => $data
    ];
    if($meta){
        $response['meta'] = $meta;
    }
    return response()->json($response, $httpStatusCode ? $httpStatusCode : 200);
}

function serviceResponse($success, $msg, $data, $httpStatusCode=null, bool $isMeta=false){
    $response = [
        'success' => $success,
        'msg' => $msg,
        'data' => $isMeta ? $data->toArray()['data'] : $data,
        'statusCode' => $httpStatusCode
        // 'meta' => $meta
    ];
    if($isMeta){
        $response['meta'] = ['current_page' => $data->toArray()['current_page'], 'limit' => $data->toArray()['to'], 'total' => $data->toArray()['total']];
    }
    return $response;
}
