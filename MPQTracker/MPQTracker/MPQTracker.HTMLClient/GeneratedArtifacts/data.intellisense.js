/// <reference path="data.js" />

(function (lightSwitchApplication) {

    msls._addEntryPoints(lightSwitchApplication.EventScore, {
        /// <field>
        /// Called when a new eventScore is created.
        /// <br/>created(msls.application.EventScore entity)
        /// </field>
        created: [lightSwitchApplication.EventScore]
    });

    msls._addEntryPoints(lightSwitchApplication.EventSlice, {
        /// <field>
        /// Called when a new eventSlice is created.
        /// <br/>created(msls.application.EventSlice entity)
        /// </field>
        created: [lightSwitchApplication.EventSlice]
    });

    msls._addEntryPoints(lightSwitchApplication.PvPEvent, {
        /// <field>
        /// Called when a new pvPEvent is created.
        /// <br/>created(msls.application.PvPEvent entity)
        /// </field>
        created: [lightSwitchApplication.PvPEvent]
    });

    msls._addEntryPoints(lightSwitchApplication.PvPInstance, {
        /// <field>
        /// Called when a new pvPInstance is created.
        /// <br/>created(msls.application.PvPInstance entity)
        /// </field>
        created: [lightSwitchApplication.PvPInstance]
    });

}(msls.application));
