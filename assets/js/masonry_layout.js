var elem = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
        
    });

    // element argument can be a selector string
    //   for an individual element
    var msnry = new Masonry('.grid', {
        // options
        fitWidth: true
    });

    imagesLoaded(grid).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });