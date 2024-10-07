$(document).ready(function(){

    var initialDistance = 0;
    var initialZoom = 1;

    $(".zoom").on("mousemove touchmove", function(e){
        if (e.type === "mousemove") {
            zoom(e);
        } else if (e.touches.length === 1) {
            // تعامل مع التحريك بإصبع واحد
            zoom(e);
        } else if (e.touches.length === 2) {
            // تعامل مع الزووم بإصبعين
            pinchZoom(e);
        }
    });

    function zoom(e){
        var x, y;
        var zoomer = e.currentTarget;

        if(e.type === "mousemove") {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        } else if (e.type === "touchmove") {
            var touch = e.touches[0];
            var rect = zoomer.getBoundingClientRect();
            offsetX = touch.pageX - rect.left;
            offsetY = touch.pageY - rect.top;
        }

        x = (offsetX / zoomer.offsetWidth) * 100;
        y = (offsetY / zoomer.offsetHeight) * 100;
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
    }

    function pinchZoom(e) {
        e.preventDefault();
        var zoomer = e.currentTarget;
        
        // حساب المسافة بين الإصبعين
        var touch1 = e.touches[0];
        var touch2 = e.touches[1];

        var distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
        );

        if (initialDistance === 0) {
            initialDistance = distance; // تخزين المسافة الأولى بين الإصبعين
        } else {
            var scale = distance / initialDistance; // نسبة التكبير بناءً على المسافة
            zoomer.style.backgroundSize = (initialZoom * scale * 100) + "%"; // تطبيق الزووم
        }
    }

    // إعادة تعيين الزووم عند رفع الإصبعين
    $(".zoom").on("touchend", function(e) {
        if (e.touches.length < 2) {
            initialDistance = 0;
            initialZoom = parseFloat($(this).css("background-size")) / 100; // حفظ مستوى الزووم الحالي
        }
    });

});