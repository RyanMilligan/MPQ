/// <reference path="data.js" />

(function (lightSwitchApplication) {

    var $Screen = msls.Screen,
        $defineScreen = msls._defineScreen,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString,
        $defineShowScreen = msls._defineShowScreen;

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

    msls._addToNamespace("msls.application", {

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
                    return this.expand("PvPInstance");
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
                    return this.expand("EventSlice");
                }
            }
        ], [
            { name: "AddPvpInstance" }
        ]),

        AddEditPvPInstance: $defineScreen(AddEditPvPInstance, [
            { name: "PvPInstance", kind: "local", type: lightSwitchApplication.PvPInstance }
        ], [
        ]),

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
        })

    });

}(msls.application));
