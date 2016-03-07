/// <reference path="viewModel.js" />

(function (lightSwitchApplication) {

    var $element = document.createElement("div");

    lightSwitchApplication.AddEditEventScore.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditEventScore
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.AddEditEventScore,
            value: lightSwitchApplication.AddEditEventScore
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.AddEditEventScore,
            value: lightSwitchApplication.EventScore
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.EventScore,
            value: lightSwitchApplication.EventScore
        },
        ScreenName: {
            _$class: msls.ContentItem,
            _$name: "ScreenName",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.EventScore,
            value: String
        },
        Score: {
            _$class: msls.ContentItem,
            _$name: "Score",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        Rank: {
            _$class: msls.ContentItem,
            _$name: "Rank",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditEventScore,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditEventScore
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddEditEventScore, {
        /// <field>
        /// Called when a new AddEditEventScore screen is created.
        /// <br/>created(msls.application.AddEditEventScore screen)
        /// </field>
        created: [lightSwitchApplication.AddEditEventScore],
        /// <field>
        /// Called before changes on an active AddEditEventScore screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddEditEventScore screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddEditEventScore],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("Details"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("left"); }],
        /// <field>
        /// Called after the ScreenName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ScreenName_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("ScreenName"); }],
        /// <field>
        /// Called after the Score content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Score_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("Score"); }],
        /// <field>
        /// Called after the Rank content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Rank_postRender: [$element, function () { return new lightSwitchApplication.AddEditEventScore().findContentItem("Rank"); }]
    });

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
        Group1: {
            _$class: msls.ContentItem,
            _$name: "Group1",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: lightSwitchApplication.BrowseEvents
        },
        PvPEvents: {
            _$class: msls.ContentItem,
            _$name: "PvPEvents",
            _$parentName: "Group1",
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
        Name: {
            _$class: msls.ContentItem,
            _$name: "Name",
            _$parentName: "PvPEventsTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.PvPEvent,
            value: String
        },
        AddPvPEvent: {
            _$class: msls.ContentItem,
            _$name: "AddPvPEvent",
            _$parentName: "Group1",
            screen: lightSwitchApplication.BrowseEvents
        },
        deleteSelectedEvent: {
            _$class: msls.ContentItem,
            _$name: "deleteSelectedEvent",
            _$parentName: "Group1",
            screen: lightSwitchApplication.BrowseEvents
        },
        EditPvPEvent: {
            _$class: msls.ContentItem,
            _$name: "EditPvPEvent",
            _$parentName: "Group1",
            screen: lightSwitchApplication.BrowseEvents
        },
        Group2: {
            _$class: msls.ContentItem,
            _$name: "Group2",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: lightSwitchApplication.BrowseEvents
        },
        PvPInstances: {
            _$class: msls.ContentItem,
            _$name: "PvPInstances",
            _$parentName: "Group2",
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
        AddPvPInstance: {
            _$class: msls.ContentItem,
            _$name: "AddPvPInstance",
            _$parentName: "Group2",
            screen: lightSwitchApplication.BrowseEvents
        },
        Group3: {
            _$class: msls.ContentItem,
            _$name: "Group3",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: lightSwitchApplication.BrowseEvents
        },
        EventSliceCollection: {
            _$class: msls.ContentItem,
            _$name: "EventSliceCollection",
            _$parentName: "Group3",
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
        SliceNumber: {
            _$class: msls.ContentItem,
            _$name: "SliceNumber",
            _$parentName: "EventSliceCollectionTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventSlice,
            value: Number
        },
        ScreenContent: {
            _$class: msls.ContentItem,
            _$name: "ScreenContent",
            _$parentName: "EventSliceCollectionTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventSlice,
            value: lightSwitchApplication.EventSlice
        },
        Group4: {
            _$class: msls.ContentItem,
            _$name: "Group4",
            _$parentName: "Group",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.BrowseEvents,
            value: lightSwitchApplication.BrowseEvents
        },
        EventScores: {
            _$class: msls.ContentItem,
            _$name: "EventScores",
            _$parentName: "Group4",
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
        ScreenName: {
            _$class: msls.ContentItem,
            _$name: "ScreenName",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventScore,
            value: String
        },
        Score: {
            _$class: msls.ContentItem,
            _$name: "Score",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        Rank: {
            _$class: msls.ContentItem,
            _$name: "Rank",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        CreatedBy: {
            _$class: msls.ContentItem,
            _$name: "CreatedBy",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.BrowseEvents,
            data: lightSwitchApplication.EventScore,
            value: String
        },
        AddEventScore: {
            _$class: msls.ContentItem,
            _$name: "AddEventScore",
            _$parentName: "Group4",
            screen: lightSwitchApplication.BrowseEvents
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
        /// Called to determine if the deleteSelectedEvent method can be executed.
        /// <br/>canExecute(msls.application.BrowseEvents screen)
        /// </field>
        deleteSelectedEvent_canExecute: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called to execute the deleteSelectedEvent method.
        /// <br/>execute(msls.application.BrowseEvents screen)
        /// </field>
        deleteSelectedEvent_execute: [lightSwitchApplication.BrowseEvents],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group"); }],
        /// <field>
        /// Called after the Group1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group1_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group1"); }],
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
        /// Called after the Name content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Name_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Name"); }],
        /// <field>
        /// Called after the AddPvPEvent content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddPvPEvent_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("AddPvPEvent"); }],
        /// <field>
        /// Called after the deleteSelectedEvent content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        deleteSelectedEvent_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("deleteSelectedEvent"); }],
        /// <field>
        /// Called after the EditPvPEvent content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EditPvPEvent_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EditPvPEvent"); }],
        /// <field>
        /// Called after the Group2 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group2_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group2"); }],
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
        /// Called after the AddPvPInstance content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddPvPInstance_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("AddPvPInstance"); }],
        /// <field>
        /// Called after the Group3 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group3_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group3"); }],
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
        /// Called after the SliceNumber content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SliceNumber_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("SliceNumber"); }],
        /// <field>
        /// Called to render the ScreenContent content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ScreenContent_render: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("ScreenContent"); }],
        /// <field>
        /// Called after the Group4 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group4_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Group4"); }],
        /// <field>
        /// Called after the EventScores content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScores_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventScores"); }],
        /// <field>
        /// Called after the EventScoresTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScoresTemplate_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("EventScoresTemplate"); }],
        /// <field>
        /// Called after the ScreenName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ScreenName_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("ScreenName"); }],
        /// <field>
        /// Called after the Score content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Score_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Score"); }],
        /// <field>
        /// Called after the Rank content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Rank_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("Rank"); }],
        /// <field>
        /// Called after the CreatedBy content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CreatedBy_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("CreatedBy"); }],
        /// <field>
        /// Called after the AddEventScore content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddEventScore_postRender: [$element, function () { return new lightSwitchApplication.BrowseEvents().findContentItem("AddEventScore"); }]
    });

    lightSwitchApplication.NowReportingScreen.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.NowReportingScreen
        },
        Group: {
            _$class: msls.ContentItem,
            _$name: "Group",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.NowReportingScreen,
            value: lightSwitchApplication.NowReportingScreen
        },
        NowReporting: {
            _$class: msls.ContentItem,
            _$name: "NowReporting",
            _$parentName: "Group",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.NowReportingScreen,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.NowReportingScreen,
                _$entry: {
                    elementType: lightSwitchApplication.PvPInstance
                }
            }
        },
        NowReportingTemplate: {
            _$class: msls.ContentItem,
            _$name: "NowReportingTemplate",
            _$parentName: "NowReporting",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPInstance
        },
        PvPEvent2: {
            _$class: msls.ContentItem,
            _$name: "PvPEvent2",
            _$parentName: "NowReportingTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.PvPInstance,
            value: lightSwitchApplication.PvPEvent
        },
        Name: {
            _$class: msls.ContentItem,
            _$name: "Name",
            _$parentName: "PvPEvent2",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.PvPEvent,
            value: String
        },
        StartTime1: {
            _$class: msls.ContentItem,
            _$name: "StartTime1",
            _$parentName: "NowReportingTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.PvPInstance,
            value: Date
        },
        NowReporting_selectedItem: {
            _$class: msls.ContentItem,
            _$name: "NowReporting_selectedItem",
            _$parentName: "Group",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.NowReportingScreen,
            value: lightSwitchApplication.PvPInstance
        },
        EventSliceCollection: {
            _$class: msls.ContentItem,
            _$name: "EventSliceCollection",
            _$parentName: "NowReporting_selectedItem",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.PvPInstance,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.NowReportingScreen,
                _$entry: {
                    elementType: lightSwitchApplication.EventSlice
                }
            }
        },
        EventSliceCollectionTemplate: {
            _$class: msls.ContentItem,
            _$name: "EventSliceCollectionTemplate",
            _$parentName: "EventSliceCollection",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventSlice,
            value: lightSwitchApplication.EventSlice
        },
        SliceNumber: {
            _$class: msls.ContentItem,
            _$name: "SliceNumber",
            _$parentName: "EventSliceCollectionTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventSlice,
            value: Number
        },
        SliceStartTime: {
            _$class: msls.ContentItem,
            _$name: "SliceStartTime",
            _$parentName: "EventSliceCollectionTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventSlice,
            value: Object
        },
        Group1: {
            _$class: msls.ContentItem,
            _$name: "Group1",
            _$parentName: "Group",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.NowReportingScreen,
            value: lightSwitchApplication.NowReportingScreen
        },
        EventScores: {
            _$class: msls.ContentItem,
            _$name: "EventScores",
            _$parentName: "Group1",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.NowReportingScreen,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.NowReportingScreen,
                _$entry: {
                    elementType: lightSwitchApplication.EventScore
                }
            }
        },
        EventScoresTemplate: {
            _$class: msls.ContentItem,
            _$name: "EventScoresTemplate",
            _$parentName: "EventScores",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventScore,
            value: lightSwitchApplication.EventScore
        },
        ScreenName: {
            _$class: msls.ContentItem,
            _$name: "ScreenName",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventScore,
            value: String
        },
        Score: {
            _$class: msls.ContentItem,
            _$name: "Score",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        Rank: {
            _$class: msls.ContentItem,
            _$name: "Rank",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventScore,
            value: Number
        },
        CreatedBy: {
            _$class: msls.ContentItem,
            _$name: "CreatedBy",
            _$parentName: "EventScoresTemplate",
            screen: lightSwitchApplication.NowReportingScreen,
            data: lightSwitchApplication.EventScore,
            value: String
        },
        AddEventScore: {
            _$class: msls.ContentItem,
            _$name: "AddEventScore",
            _$parentName: "Group1",
            screen: lightSwitchApplication.NowReportingScreen
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.NowReportingScreen
        }
    };

    msls._addEntryPoints(lightSwitchApplication.NowReportingScreen, {
        /// <field>
        /// Called when a new NowReportingScreen screen is created.
        /// <br/>created(msls.application.NowReportingScreen screen)
        /// </field>
        created: [lightSwitchApplication.NowReportingScreen],
        /// <field>
        /// Called before changes on an active NowReportingScreen screen are applied.
        /// <br/>beforeApplyChanges(msls.application.NowReportingScreen screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.NowReportingScreen],
        /// <field>
        /// Called to determine if the AddEventScore method can be executed.
        /// <br/>canExecute(msls.application.NowReportingScreen screen)
        /// </field>
        AddEventScore_canExecute: [lightSwitchApplication.NowReportingScreen],
        /// <field>
        /// Called to execute the AddEventScore method.
        /// <br/>execute(msls.application.NowReportingScreen screen)
        /// </field>
        AddEventScore_execute: [lightSwitchApplication.NowReportingScreen],
        /// <field>
        /// Called after the Group content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("Group"); }],
        /// <field>
        /// Called after the NowReporting content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        NowReporting_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("NowReporting"); }],
        /// <field>
        /// Called after the NowReportingTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        NowReportingTemplate_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("NowReportingTemplate"); }],
        /// <field>
        /// Called after the PvPEvent2 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        PvPEvent2_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("PvPEvent2"); }],
        /// <field>
        /// Called after the Name content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Name_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("Name"); }],
        /// <field>
        /// Called after the StartTime1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        StartTime1_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("StartTime1"); }],
        /// <field>
        /// Called after the NowReporting_selectedItem content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        NowReporting_selectedItem_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("NowReporting_selectedItem"); }],
        /// <field>
        /// Called after the EventSliceCollection content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventSliceCollection_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("EventSliceCollection"); }],
        /// <field>
        /// Called after the EventSliceCollectionTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventSliceCollectionTemplate_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("EventSliceCollectionTemplate"); }],
        /// <field>
        /// Called after the SliceNumber content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SliceNumber_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("SliceNumber"); }],
        /// <field>
        /// Called after the SliceStartTime content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SliceStartTime_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("SliceStartTime"); }],
        /// <field>
        /// Called after the Group1 content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Group1_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("Group1"); }],
        /// <field>
        /// Called after the EventScores content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScores_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("EventScores"); }],
        /// <field>
        /// Called after the EventScoresTemplate content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        EventScoresTemplate_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("EventScoresTemplate"); }],
        /// <field>
        /// Called after the ScreenName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ScreenName_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("ScreenName"); }],
        /// <field>
        /// Called after the Score content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Score_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("Score"); }],
        /// <field>
        /// Called after the Rank content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Rank_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("Rank"); }],
        /// <field>
        /// Called after the CreatedBy content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        CreatedBy_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("CreatedBy"); }],
        /// <field>
        /// Called after the AddEventScore content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        AddEventScore_postRender: [$element, function () { return new lightSwitchApplication.NowReportingScreen().findContentItem("AddEventScore"); }]
    });

}(msls.application));