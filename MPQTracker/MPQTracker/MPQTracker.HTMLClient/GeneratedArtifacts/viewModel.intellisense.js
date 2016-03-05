/// <reference path="viewModel.js" />

(function (lightSwitchApplication) {

    var $element = document.createElement("div");

    lightSwitchApplication.AddEditPvPEvent.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditPvPEvent
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.AddEditPvPEvent,
            value: lightSwitchApplication.AddEditPvPEvent
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.AddEditPvPEvent,
            value: lightSwitchApplication.PvPEvent
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.PvPEvent,
            value: lightSwitchApplication.PvPEvent
        },
        Name: {
            _$class: msls.ContentItem,
            _$name: "Name",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.PvPEvent,
            value: String
        },
        right: {
            _$class: msls.ContentItem,
            _$name: "right",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.PvPEvent,
            value: lightSwitchApplication.PvPEvent
        },
        PvPInstances: {
            _$class: msls.ContentItem,
            _$name: "PvPInstances",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.AddEditPvPEvent,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.AddEditPvPEvent,
                _$entry: {
                    elementType: lightSwitchApplication.PvPInstance
                }
            }
        },
        PvPInstancesTemplate: {
            _$class: msls.ContentItem,
            _$name: "PvPInstancesTemplate",
            _$parentName: "PvPInstances",
            screen: lightSwitchApplication.AddEditPvPEvent,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditPvPEvent
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddEditPvPEvent, {
        /// <field>
        /// Called when a new AddEditPvPEvent screen is created.
        /// <br/>created(msls.application.AddEditPvPEvent screen)
        /// </field>
        created: [lightSwitchApplication.AddEditPvPEvent],
        /// <field>
        /// Called before changes on an active AddEditPvPEvent screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddEditPvPEvent screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddEditPvPEvent],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("Details"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("left"); }],
        /// <field>
        /// Called after the Name content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Name_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("Name"); }],
        /// <field>
        /// Called after the right content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        right_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("right"); }],
        /// <field>
        /// Called after the PvPInstances content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPInstances_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("PvPInstances"); }],
        /// <field>
        /// Called after the PvPInstancesTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPInstancesTemplate_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPEvent().findContentItem("PvPInstancesTemplate"); }]
    });

    lightSwitchApplication.BrowseEvents.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseEvents
        },
        Group: {
            _$class: msls.ContentItem,
            _$name: "Group",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: lightSwitchApplication.BrowseEvents
        },
        PvPEvents: {
            _$class: msls.ContentItem,
            _$name: "PvPEvents",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseEvents,
                _$entry: {
                    elementType: lightSwitchApplication.PvPEvent
                }
            }
        },
        PvPEventsTemplate: {
            _$class: msls.ContentItem,
            _$name: "PvPEventsTemplate",
            _$parentName: "PvPEvents",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.PvPEvent,
            value: lightSwitchApplication.PvPEvent
        },
        PvPInstances: {
            _$class: msls.ContentItem,
            _$name: "PvPInstances",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseEvents,
                _$entry: {
                    elementType: lightSwitchApplication.PvPInstance
                }
            }
        },
        PvPInstancesTemplate: {
            _$class: msls.ContentItem,
            _$name: "PvPInstancesTemplate",
            _$parentName: "PvPInstances",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        StartTime: {
            _$class: msls.ContentItem,
            _$name: "StartTime",
            _$parentName: "PvPInstancesTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.PvPInstance,
            value: Date
        },
        AddPvPInstance1: {
            _$class: msls.ContentItem,
            _$name: "AddPvPInstance1",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents
        },
        EventSliceCollection: {
            _$class: msls.ContentItem,
            _$name: "EventSliceCollection",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseEvents,
                _$entry: {
                    elementType: lightSwitchApplication.EventSlice
                }
            }
        },
        EventSliceCollectionTemplate: {
            _$class: msls.ContentItem,
            _$name: "EventSliceCollectionTemplate",
            _$parentName: "EventSliceCollection",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventSlice,
            value: lightSwitchApplication.EventSlice
        },
        EventScores: {
            _$class: msls.ContentItem,
            _$name: "EventScores",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseEvents,
                _$entry: {
                    elementType: lightSwitchApplication.EventScore
                }
            }
        },
        EventScoresTemplate: {
            _$class: msls.ContentItem,
            _$name: "EventScoresTemplate",
            _$parentName: "EventScores",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventScore,
            value: lightSwitchApplication.EventScore
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseEvents
        }
    };

    msls._addEntryPoints(lightSwitchApplication.BrowseEvents, {
        /// <field>
        /// Called when a new BrowseEvents screen is created.
        /// <br/>created(msls.application.BrowseEvents screen)
        /// </field>
        created: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called before changes on an active BrowseEvents screen are applied.
        /// <br/>beforeApplyChanges(msls.application.BrowseEvents screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called to determine if the AddPvpInstance method can be executed.
        /// <br/>canExecute(msls.application.BrowseEvents screen)
        /// </field>
        AddPvpInstance_canExecute: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called to execute the AddPvpInstance method.
        /// <br/>execute(msls.application.BrowseEvents screen)
        /// </field>
        AddPvpInstance_execute: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group"); }],
        /// <field>
        /// Called after the PvPEvents content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPEvents_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("PvPEvents"); }],
        /// <field>
        /// Called after the PvPEventsTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPEventsTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("PvPEventsTemplate"); }],
        /// <field>
        /// Called after the PvPInstances content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPInstances_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("PvPInstances"); }],
        /// <field>
        /// Called after the PvPInstancesTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPInstancesTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("PvPInstancesTemplate"); }],
        /// <field>
        /// Called after the StartTime content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        StartTime_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("StartTime"); }],
        /// <field>
        /// Called after the AddPvPInstance1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddPvPInstance1_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("AddPvPInstance1"); }],
        /// <field>
        /// Called after the EventSliceCollection content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventSliceCollection_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventSliceCollection"); }],
        /// <field>
        /// Called after the EventSliceCollectionTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventSliceCollectionTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventSliceCollectionTemplate"); }],
        /// <field>
        /// Called after the EventScores content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScores_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventScores"); }],
        /// <field>
        /// Called after the EventScoresTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScoresTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventScoresTemplate"); }]
    });

    lightSwitchApplication.AddEditPvPInstance.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditPvPInstance
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.AddEditPvPInstance,
            value: lightSwitchApplication.AddEditPvPInstance
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.AddEditPvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        PvPEvent: {
            _$class: msls.ContentItem,
            _$name: "PvPEvent",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPEvent
        },
        RowTemplate: {
            _$class: msls.ContentItem,
            _$name: "RowTemplate",
            _$parentName: "PvPEvent",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.PvPEvent,
            value: lightSwitchApplication.PvPEvent
        },
        right: {
            _$class: msls.ContentItem,
            _$name: "right",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        StartTime: {
            _$class: msls.ContentItem,
            _$name: "StartTime",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditPvPInstance,
            data: lightSwitchApplication.PvPInstance,
            value: Date
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditPvPInstance
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddEditPvPInstance, {
        /// <field>
        /// Called when a new AddEditPvPInstance screen is created.
        /// <br/>created(msls.application.AddEditPvPInstance screen)
        /// </field>
        created: [lightSwitchApplication.AddEditPvPInstance],
        /// <field>
        /// Called before changes on an active AddEditPvPInstance screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddEditPvPInstance screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddEditPvPInstance],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("Details"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("left"); }],
        /// <field>
        /// Called after the PvPEvent content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPEvent_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("PvPEvent"); }],
        /// <field>
        /// Called after the RowTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        RowTemplate_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("RowTemplate"); }],
        /// <field>
        /// Called after the right content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        right_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("right"); }],
        /// <field>
        /// Called after the StartTime content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        StartTime_postRender: [$element, function () { return new lightSwitchApplication.AddEditPvPInstance().findContentItem("StartTime"); }]
    });

}(msls.application));