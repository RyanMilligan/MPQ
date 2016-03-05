/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.PvPInstance.created = function (entity) {
    // Write code here.
    for (var i = 0; i < 5; i++) {
        var slice = entity.EventSliceCollection.AddNew()

        slice.SliceNumber = i + 1;
    }
};