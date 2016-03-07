/// <reference path="~/GeneratedArtifacts/viewModel.js" />


myapp.BrowseEvents.deleteSelectedEvent_canExecute = function (screen) {
    // Write code here.
    return false;//screen.PvPEvents.selectedItem !== null;
};
myapp.BrowseEvents.deleteSelectedEvent_execute = function (screen) {
    // Write code here.
    screen.PvPEvents.deleteSelected();

    myapp.commitChanges().then(function () { msls.showMessageBox("Success") }, function (e) { msls.showMessageBox(e.message) })
};


myapp.BrowseEvents.ScreenContent_render = function (element, contentItem) {
    // Write code here.

};