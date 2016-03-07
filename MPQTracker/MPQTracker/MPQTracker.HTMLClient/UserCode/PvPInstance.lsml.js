/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.PvPInstance.created = function (entity) {
    // Write code here.
    entity.Duration = new Date(0, 0, 2, 12);
    for (var i = 0; i < 5; i++) {
        var slice = new myapp.EventSlice()
        slice.PvPInstance = entity
        slice.SliceNumber = i + 1;
    }
}