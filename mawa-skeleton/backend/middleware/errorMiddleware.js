export function errorHandler(err , req , res , next){
    console.log(err);
    const statusCode  = res.statusCode  !==200 ?res.statusCode :500
    res.status(statusCode ).json({
        message: err.message || 'صار في خطأ غير متوقع بالسيرفر',
    });
}