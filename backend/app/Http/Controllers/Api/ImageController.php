<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;
use Madzipper;

class ImageController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'size' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $originImage = $request->file('image');
        $filetime = time().rand(3, 10);
        $filename = $filetime . '.' . $originImage->getClientOriginalExtension();

        $image = Image::make($request->file('image'));
        $width = $image->width();
        $height = $image->height();

        $vertical = $width < $height ? true : false;
        $horizontal = $width > $height ? true : false;

        $originName = 'origin_'.$filename;
        if($request->size == 'origin' || $request->size == 'all') {
            $originImage->move('uploads/', $originName);
        }

        $squreName = 'square_'.$filename;
        if($request->size == 'square' || $request->size == 'all') {
            if($vertical) {
                $image->resizeCanvas($height, $height, 'top-left', false, '#ffffff');
            } else if($horizontal) {
                $image->resizeCanvas($width, $width, 'top-left', false, '#ffffff');
            }

            $image->save(public_path('uploads/' . $squreName));
        }

        $smallName = 'small_'.$filename;
        if($request->size == 'small' || $request->size == 'all') {
            if($vertical) {
                $image->resize(null, 256, function($constraint) {
                    $constraint->aspectRatio();
                });
            } else if($horizontal) {
                $image->resize(256, null, function($constraint) {
                    $constraint->aspectRatio();
                });
            }

            $image->resizeCanvas(256, 256, 'top-left', false, '#ffffff');
            $image->save(public_path('uploads/' . $smallName));
        }

        $zipName = 'all_' . $filetime . '.zip';
        if ($request->size == 'all') {
            Madzipper::make('uploads/' . $zipName)->add(array(public_path('uploads/' . $originName), public_path('uploads/' . $squreName), public_path('uploads/' . $smallName)))->close();
        }

        $downloadName = $request->size . '_' . $filetime . '.';
        $downloadName .= $request->size == 'all' ? 'zip' : $originImage->getClientOriginalExtension();

        return response()->download(public_path('uploads/'. $downloadName));
    }
}
