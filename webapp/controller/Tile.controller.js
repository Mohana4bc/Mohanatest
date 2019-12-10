sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.axium.Axium.controller.Tile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.axium.Axium.view.Tile
		 */
		onInit: function () {

		},
		onclick: function () {
			var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
			sRouter.navTo("Home", true);
		},
		onPressBack: function () {
			var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
			sRouter.navTo("Login", true);
		},
		onPressLog: function () {
			var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
			sRouter.navTo("Login", true);
		},
		onInboundPress: function (oEvent) {
			var oTileFlag = "InboundFlag";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Home", {
				tileFlag: oTileFlag
			});
		},
		onOutboundPress: function (oEvent) {
			var oTileFlag = "OutboundFlag";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Home", {
				tileFlag: oTileFlag
			});
		},
		onStocktransferPress: function (oEvent) {
			var oTileFlag = "StocktransferFlag";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Home", {
				tileFlag: oTileFlag
			});
		},
		onWarehouseinternalPress: function (oEvent) {
			var oTileFlag = "WarehouseinternalFlag";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Home", {
				tileFlag: oTileFlag
			});
		},
		onStockoverviewPress: function (oEvent) {
			var oTileFlag = "StockoverviewFlag";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Home", {
				tileFlag: oTileFlag
			});
		},
		onPhysicalinventoryPress: function (oEvent) {
			// var oTileFlag = "PhysicalinventoryFlag";
			// var oRouter = this.getOwnerComponent().getRouter();
			// oRouter.navTo("Home", {
			// 	tileFlag: oTileFlag
			// });
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PlantStorageLoc", {});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.axium.Axium.view.Tile
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.axium.Axium.view.Tile
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.axium.Axium.view.Tile
		 */
		//	onExit: function() {
		//
		//	}

	});

});