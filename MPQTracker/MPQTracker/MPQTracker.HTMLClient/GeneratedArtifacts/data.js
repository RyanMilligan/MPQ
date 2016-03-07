/// <reference path="../Scripts/msls.js" />

window.myapp = msls.application;

(function (lightSwitchApplication) {

    var $Entity = msls.Entity,
        $DataService = msls.DataService,
        $DataWorkspace = msls.DataWorkspace,
        $defineEntity = msls._defineEntity,
        $defineDataService = msls._defineDataService,
        $defineDataWorkspace = msls._defineDataWorkspace,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString;

    function EventScore(entitySet) {
        /// <summary>
        /// Represents the EventScore entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this eventScore.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this eventScore.
        /// </field>
        /// <field name="Score" type="Number">
        /// Gets or sets the score for this eventScore.
        /// </field>
        /// <field name="Rank" type="Number">
        /// Gets or sets the rank for this eventScore.
        /// </field>
        /// <field name="EventSlice" type="msls.application.EventSlice">
        /// Gets or sets the eventSlice for this eventScore.
        /// </field>
        /// <field name="ScreenName" type="String">
        /// Gets or sets the screenName for this eventScore.
        /// </field>
        /// <field name="CreatedBy" type="String">
        /// Gets or sets the createdBy for this eventScore.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this eventScore.
        /// </field>
        /// <field name="ModifiedBy" type="String">
        /// Gets or sets the modifiedBy for this eventScore.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this eventScore.
        /// </field>
        /// <field name="RowVersion" type="Array">
        /// Gets or sets the rowVersion for this eventScore.
        /// </field>
        /// <field name="details" type="msls.application.EventScore.Details">
        /// Gets the details for this eventScore.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function EventSlice(entitySet) {
        /// <summary>
        /// Represents the EventSlice entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this eventSlice.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this eventSlice.
        /// </field>
        /// <field name="PvPInstance" type="msls.application.PvPInstance">
        /// Gets or sets the pvPInstance for this eventSlice.
        /// </field>
        /// <field name="SliceNumber" type="Number">
        /// Gets or sets the sliceNumber for this eventSlice.
        /// </field>
        /// <field name="EventScores" type="msls.EntityCollection" elementType="msls.application.EventScore">
        /// Gets the eventScores for this eventSlice.
        /// </field>
        /// <field name="CreatedBy" type="String">
        /// Gets or sets the createdBy for this eventSlice.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this eventSlice.
        /// </field>
        /// <field name="ModifiedBy" type="String">
        /// Gets or sets the modifiedBy for this eventSlice.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this eventSlice.
        /// </field>
        /// <field name="RowVersion" type="Array">
        /// Gets or sets the rowVersion for this eventSlice.
        /// </field>
        /// <field name="details" type="msls.application.EventSlice.Details">
        /// Gets the details for this eventSlice.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function PvPEvent(entitySet) {
        /// <summary>
        /// Represents the PvPEvent entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this pvPEvent.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this pvPEvent.
        /// </field>
        /// <field name="Name" type="String">
        /// Gets or sets the name for this pvPEvent.
        /// </field>
        /// <field name="PvPInstances" type="msls.EntityCollection" elementType="msls.application.PvPInstance">
        /// Gets the pvPInstances for this pvPEvent.
        /// </field>
        /// <field name="CreatedBy" type="String">
        /// Gets or sets the createdBy for this pvPEvent.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this pvPEvent.
        /// </field>
        /// <field name="ModifiedBy" type="String">
        /// Gets or sets the modifiedBy for this pvPEvent.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this pvPEvent.
        /// </field>
        /// <field name="RowVersion" type="Array">
        /// Gets or sets the rowVersion for this pvPEvent.
        /// </field>
        /// <field name="details" type="msls.application.PvPEvent.Details">
        /// Gets the details for this pvPEvent.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function PvPInstance(entitySet) {
        /// <summary>
        /// Represents the PvPInstance entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this pvPInstance.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this pvPInstance.
        /// </field>
        /// <field name="PvPEvent" type="msls.application.PvPEvent">
        /// Gets or sets the pvPEvent for this pvPInstance.
        /// </field>
        /// <field name="EventSliceCollection" type="msls.EntityCollection" elementType="msls.application.EventSlice">
        /// Gets the eventSliceCollection for this pvPInstance.
        /// </field>
        /// <field name="StartTime" type="Date">
        /// Gets or sets the startTime for this pvPInstance.
        /// </field>
        /// <field name="Duration" type="Date">
        /// Gets or sets the duration for this pvPInstance.
        /// </field>
        /// <field name="CreatedBy" type="String">
        /// Gets or sets the createdBy for this pvPInstance.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this pvPInstance.
        /// </field>
        /// <field name="ModifiedBy" type="String">
        /// Gets or sets the modifiedBy for this pvPInstance.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this pvPInstance.
        /// </field>
        /// <field name="RowVersion" type="Array">
        /// Gets or sets the rowVersion for this pvPInstance.
        /// </field>
        /// <field name="details" type="msls.application.PvPInstance.Details">
        /// Gets the details for this pvPInstance.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function ApplicationData(dataWorkspace) {
        /// <summary>
        /// Represents the ApplicationData data service.
        /// </summary>
        /// <param name="dataWorkspace" type="msls.DataWorkspace">
        /// The data workspace that created this data service.
        /// </param>
        /// <field name="EventScores" type="msls.EntitySet">
        /// Gets the EventScores entity set.
        /// </field>
        /// <field name="EventSliceSet" type="msls.EntitySet">
        /// Gets the EventSliceSet entity set.
        /// </field>
        /// <field name="PvPEvents" type="msls.EntitySet">
        /// Gets the PvPEvents entity set.
        /// </field>
        /// <field name="PvPInstances" type="msls.EntitySet">
        /// Gets the PvPInstances entity set.
        /// </field>
        /// <field name="details" type="msls.application.ApplicationData.Details">
        /// Gets the details for this data service.
        /// </field>
        $DataService.call(this, dataWorkspace);
    };
    function DataWorkspace() {
        /// <summary>
        /// Represents the data workspace.
        /// </summary>
        /// <field name="ApplicationData" type="msls.application.ApplicationData">
        /// Gets the ApplicationData data service.
        /// </field>
        /// <field name="details" type="msls.application.DataWorkspace.Details">
        /// Gets the details for this data workspace.
        /// </field>
        $DataWorkspace.call(this);
    };

    msls._addToNamespace("msls.application", {

        EventScore: $defineEntity(EventScore, [
            { name: "Id", type: Number },
            { name: "Score", type: Number },
            { name: "Rank", type: Number },
            { name: "EventSlice", kind: "reference", type: EventSlice },
            { name: "ScreenName", type: String },
            { name: "CreatedBy", type: String, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "ModifiedBy", type: String, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "RowVersion", type: Array }
        ]),

        EventSlice: $defineEntity(EventSlice, [
            { name: "Id", type: Number },
            { name: "PvPInstance", kind: "reference", type: PvPInstance },
            { name: "SliceNumber", type: Number },
            { name: "EventScores", kind: "collection", elementType: EventScore },
            { name: "CreatedBy", type: String, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "ModifiedBy", type: String, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "RowVersion", type: Array }
        ]),

        PvPEvent: $defineEntity(PvPEvent, [
            { name: "Id", type: Number },
            { name: "Name", type: String },
            { name: "PvPInstances", kind: "collection", elementType: PvPInstance },
            { name: "CreatedBy", type: String, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "ModifiedBy", type: String, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "RowVersion", type: Array }
        ]),

        PvPInstance: $defineEntity(PvPInstance, [
            { name: "Id", type: Number },
            { name: "PvPEvent", kind: "reference", type: PvPEvent },
            { name: "EventSliceCollection", kind: "collection", elementType: EventSlice },
            { name: "StartTime", type: Date },
            { name: "Duration", type: Date },
            { name: "CreatedBy", type: String, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "ModifiedBy", type: String, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "RowVersion", type: Array }
        ]),

        ApplicationData: $defineDataService(ApplicationData, lightSwitchApplication.rootUri + "/ApplicationData.svc", [
            { name: "EventScores", elementType: EventScore },
            { name: "EventSliceSet", elementType: EventSlice },
            { name: "PvPEvents", elementType: PvPEvent },
            { name: "PvPInstances", elementType: PvPInstance }
        ], [
            {
                name: "EventScores_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.EventScores },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/EventScores(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            },
            {
                name: "EventSliceSet_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.EventSliceSet },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/EventSliceSet(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            },
            {
                name: "PvPEvents_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.PvPEvents },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/PvPEvents(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            },
            {
                name: "PvPInstances_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.PvPInstances },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/PvPInstances(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            },
            {
                name: "NowReporting", value: function () {
                    return new $DataServiceQuery({ _entitySet: this.PvPInstances },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/NowReporting()",
                        {
                        });
                }
            }
        ]),

        DataWorkspace: $defineDataWorkspace(DataWorkspace, [
            { name: "ApplicationData", type: ApplicationData }
        ])

    });

}(msls.application));
