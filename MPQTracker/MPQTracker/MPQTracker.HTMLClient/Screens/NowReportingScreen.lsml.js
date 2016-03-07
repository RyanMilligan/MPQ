/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.NowReportingScreen.created = function (screen) {
    // Write code here.
};
myapp.NowReportingScreen.AddEventScore1_postRender = function (element, contentItem) {
    // Write code here.
    screen.NowReporting.SelectedItem = screen.NowReporting[0];

};
myapp.NowReportingScreen.SliceStartTime_postRender = function (element, contentItem) {
    // Write code here.
    var offsets = [0, 5, 10, 16, 19]
    var start = contentItem.data.PvPInstance.StartTime;
    var sliceStartTime = new Date();
    var hoursToMillis = 1000 * 60 * 60;
    sliceStartTime.setTime(start.getTime() + hoursToMillis * offsets[contentItem.data.SliceNumber - 1]);
    var sliceEndTime = new Date();
    sliceEndTime.setTime(sliceStartTime.getTime() + hoursToMillis * 24 * 2.5);

    element.innerText = sliceStartTime.toTimeString() + ", " + sliceStartTime.toDateString();

    element.innerText += " - " + sliceEndTime.toTimeString() + ", " + sliceEndTime.toDateString();
}