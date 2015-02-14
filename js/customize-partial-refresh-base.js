/*global wp */

// @todo The methods in here are duplicate with what is in customize-widgets.js; they should be public there

wp.customize.Widgets = wp.customize.Widgets || {};

/**
 * @param {String} widgetId
 * @returns {Object}
 */
wp.customize.Widgets.parseWidgetId = function ( widgetId ) {
	var matches, parsed = {
		number: 0,
		idBase: ''
	};

	matches = widgetId.match( /^(.+)-(\d+)$/ );
	if ( matches ) {
		parsed.idBase = matches[1];
		parsed.number = parseInt( matches[2], 10 );
	} else {
		// likely an old single widget
		parsed.idBase = widgetId;
	}

	return parsed;
};


/**
 * Parse setting ID like widget_text[123] into its idBase (text) and number (123).
 *
 * @param {String} settingId
 * @returns {Object}
 */
wp.customize.Widgets.parseWidgetSettingId = function ( settingId ) {
	var matches, parsed = {
		number: 0,
		idBase: ''
	};

	matches = settingId.match( /^widget_(.+?)(?:\[(\d+)\])?$/ );
	if ( ! matches ) {
		return null;
	}
	parsed.idBase = matches[1];
	if ( matches[2] ) {
		parsed.number = parseInt( matches[2], 10 );
	}
	return parsed;
};

/**
 * Parse a widget ID like text-123 into its idBase (text) and number (123)
 *
 * @param {String} widgetId
 * @returns {String} settingId
 */
wp.customize.Widgets.widgetIdToSettingId = function ( widgetId ) {
	var parsed = this.parseWidgetId( widgetId ), settingId;

	settingId = 'widget_' + parsed.idBase;
	if ( parsed.number ) {
		settingId += '[' + parsed.number + ']';
	}

	return settingId;
};

/**
 * @param {String} sidebarId
 * @returns {string}
 */
wp.customize.Widgets.sidebarIdToSettingId = function ( sidebarId ) {
	return 'sidebars_widgets[' + sidebarId + ']';
};