/// <reference path="data.js" />

(function (lightSwitchApplication) {

    var $Screen = msls.Screen,
        $defineScreen = msls._defineScreen,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString,
        $defineShowScreen = msls._defineShowScreen;

    function AddEditEventScore(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddEditEventScore screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="EventScore" type="msls.application.EventScore">
        /// Gets or sets the eventScore for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddEditEventScore.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddEditEventScore", parameters);
    }

    function AddEditPvPEvent(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddEditPvPEvent screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="PvPEvent" type="msls.application.PvPEvent">
        /// Gets or sets the pvPEvent for this screen.
        /// </field>
        /// <field name="PvPInstances" type="msls.VisualCollection" elementType="msls.application.PvPInstance">
        /// Gets the pvPInstances for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddEditPvPEvent.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddEditPvPEvent", parameters);
    }

    function AddEditPvPInstance(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddEditPvPInstance screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="PvPInstance" type="msls.application.PvPInstance">
        /// Gets or sets the pvPInstance for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddEditPvPInstance.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddEditPvPInstance", parameters);
    }

    function BrowseEvents(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the BrowseEvents screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="PvPEvents" type="msls.VisualCollection" elementType="msls.application.PvPEvent">
        /// Gets the pvPEvents for this screen.
        /// </field>
        /// <field name="PvPInstances" type="msls.VisualCollection" elementType="msls.application.PvPInstance">
        /// Gets the pvPInstances for this screen.
        /// </field>
        /// <field name="EventSliceCollection" type="msls.VisualCollection" elementType="msls.application.EventSlice">
        /// Gets the eventSliceCollection for this screen.
        /// </field>
        /// <field name="EventScores" type="msls.VisualCollection" elementType="msls.application.EventScore">
        /// Gets the eventScores for this screen.
        /// </field>
        /// <field name="details" type="msls.application.BrowseEvents.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "BrowseEvents", parameters);
    }

    function NowReportingScreen(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the NowReportingScreen screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="NowReporting" type="msls.VisualCollection" elementType="msls.application.PvPInstance">
        /// Gets the nowReporting for this screen.
        /// </field>
        /// <field name="EventSliceCollection" type="msls.VisualCollection" elementType="msls.application.EventSlice">
        /// Gets the eventSliceCollection for this screen.
        /// </field>
        /// <field name="EventScores" type="msls.VisualCollection" elementType="msls.application.EventScore">
        /// Gets the eventScores for this screen.
        /// </field>
        /// <field name="SliceStartTime" type="Object">
        /// Gets or sets the sliceStartTime for this screen.
        /// </field>
        /// <field name="details" type="msls.application.NowReportingScreen.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "NowReportingScreen", parameters);
    }

    msls._addToNamespace("msls.application", {

        AddEditEventScore: $defineScreen(AddEditEventScore, [
            { name: "EventScore", kind: "local", type: lightSwitchApplication.EventScore }
        ], [
        ]),

        AddEditPvPEvent: $defineScreen(AddEditPvPEvent, [
            { name: "PvPEvent", kind: "local", type: lightSwitchApplication.PvPEvent },
            {
                name: "PvPInstances", kind: "collection", elementType: lightSwitchApplication.PvPInstance,
                getNavigationProperty: function () {
                    if (this.owner.PvPEvent) {
                        return this.owner.PvPEvent.details.properties.PvPInstances;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this.expand("PvPEvent");
                }
            }
        ], [
        ]),

        AddEditPvPInstance: $defineScreen(AddEditPvPInstance, [
            { name: "PvPInstance", kind: "local", type: lightSwitchApplication.PvPInstance }
        ], [
        ]),

        BrowseEvents: $defineScreen(BrowseEvents, [
            {
                name: "PvPEvents", kind: "collection", elementType: lightSwitchApplication.PvPEvent,
                createQuery: function () {
                    return this.dataWorkspace.ApplicationData.PvPEvents;
                }
            },
            {
                name: "PvPInstances", kind: "collection", elementType: lightSwitchApplication.PvPInstance,
                getNavigationProperty: function () {
                    if (this.owner.PvPEvents.selectedItem) {
                        return this.owner.PvPEvents.selectedItem.details.properties.PvPInstances;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this;
                }
            },
            {
                name: "EventSliceCollection", kind: "collection", elementType: lightSwitchApplication.EventSlice,
                getNavigationProperty: function () {
                    if (this.owner.PvPInstances.selectedItem) {
                        return this.owner.PvPInstances.selectedItem.details.properties.EventSliceCollection;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this;
                }
            },
            {
                name: "EventScores", kind: "collection", elementType: lightSwitchApplication.EventScore,
                getNavigationProperty: function () {
                    if (this.owner.EventSliceCollection.selectedItem) {
                        return this.owner.EventSliceCollection.selectedItem.details.properties.EventScores;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this.orderBy("Rank");
                }
            }
        ], [
            { name: "deleteSelectedEvent" }
        ]),

        NowReportingScreen: $defineScreen(NowReportingScreen, [
            {
                name: "NowReporting", kind: "collection", elementType: lightSwitchApplication.PvPInstance,
                createQuery: function () {
                    return this.dataWorkspace.ApplicationData.NowReporting().expand("PvPEvent");
                }
            },
            {
                name: "EventSliceCollection", kind: "collection", elementType: lightSwitchApplication.EventSlice,
                getNavigationProperty: function () {
                    if (this.owner.NowReporting.selectedItem) {
                        return this.owner.NowReporting.selectedItem.details.properties.EventSliceCollection;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this.orderBy("SliceNumber");
                }
            },
            {
                name: "EventScores", kind: "collection", elementType: lightSwitchApplication.EventScore,
                getNavigationProperty: function () {
                    if (this.owner.EventSliceCollection.selectedItem) {
                        return this.owner.EventSliceCollection.selectedItem.details.properties.EventScores;
                    }
                    return null;
                },
                appendQuery: function () {
                    return this.orderBy("Score");
                }
            },
            { name: "SliceStartTime", kind: "local", type: Object }
        ], [
            { name: "AddEventScore" }
        ]),

        showAddEditEventScore: $defineShowScreen(function showAddEditEventScore(EventScore, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddEditEventScore screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddEditEventScore", parameters, options);
        }),

        showAddEditPvPEvent: $defineShowScreen(function showAddEditPvPEvent(PvPEvent, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddEditPvPEvent screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddEditPvPEvent", parameters, options);
        }),

        showAddEditPvPInstance: $defineShowScreen(function showAddEditPvPInstance(PvPInstance, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddEditPvPInstance screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddEditPvPInstance", parameters, options);
        }),

        showBrowseEvents: $defineShowScreen(function showBrowseEvents(options) {
            /// <summary>
            /// Asynchronously navigates forward to the BrowseEvents screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 0);
            return lightSwitchApplication.showScreen("BrowseEvents", parameters, options);
        }),

        showNowReportingScreen: $defineShowScreen(function showNowReportingScreen(options) {
            /// <summary>
            /// Asynchronously navigates forward to the NowReportingScreen screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 0);
            return lightSwitchApplication.showScreen("NowReportingScreen", parameters, options);
        })

    });

}(msls.application));
