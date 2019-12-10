sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.axium.Axium.controller.Home", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Home").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var oRef = this;
			var tileFlag = oEvent.getParameter("arguments").tileFlag;
			if (tileFlag === "InboundFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(true);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idOS").setVisible(false);
				oRef.getView().byId("idFGPutaway").setVisible(true);
				oRef.getView().byId("idSTA").setVisible(false);
				oRef.getView().byId("idIMStock").setVisible(false);
				oRef.getView().byId("idWMBinStock").setVisible(false);
				oRef.getView().byId("idPI").setVisible(false);
			} else if (tileFlag === "OutboundFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idOS").setVisible(true);
				oRef.getView().byId("idFGPutaway").setVisible(false);
				oRef.getView().byId("idSTA").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idIMStock").setVisible(false);
				oRef.getView().byId("idWMBinStock").setVisible(false);
				oRef.getView().byId("idPI").setVisible(false);
			} else if (tileFlag === "StocktransferFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idOS").setVisible(false);
				oRef.getView().byId("idFGPutaway").setVisible(false);
				oRef.getView().byId("idSTA").setVisible(true);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idIMStock").setVisible(false);
				oRef.getView().byId("idWMBinStock").setVisible(false);
				oRef.getView().byId("idPI").setVisible(false);
			} else if (tileFlag === "WarehouseinternalFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(false);
				oRef.getView().byId("idOS").setVisible(false);
				oRef.getView().byId("idFGPutaway").setVisible(false);
				oRef.getView().byId("idSTA").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(true);
				oRef.getView().byId("idIMStock").setVisible(false);
				oRef.getView().byId("idWMBinStock").setVisible(false);
				oRef.getView().byId("idPI").setVisible(false);
			} else if (tileFlag === "StockoverviewFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idOS").setVisible(false);
				oRef.getView().byId("idFGPutaway").setVisible(false);
				oRef.getView().byId("idSTA").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idIMStock").setVisible(true);
				oRef.getView().byId("idWMBinStock").setVisible(true);
				oRef.getView().byId("idPI").setVisible(false);
			} else if (tileFlag === "PhysicalinventoryFlag") {
				oRef.getView().byId("idRMReceipt").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idOS").setVisible(false);
				oRef.getView().byId("idFGPutaway").setVisible(false);
				oRef.getView().byId("idSTA").setVisible(false);
				oRef.getView().byId("idBBTransfer").setVisible(false);
				oRef.getView().byId("idIMStock").setVisible(false);
				oRef.getView().byId("idWMBinStock").setVisible(false);
				oRef.getView().byId("idPI").setVisible(true);
			}

		},
		onPressBack: function () {
			var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
			sRouter.navTo("Tile", true);
		},
		onPressFG: function (e) {
			var that = this;
			var data = that.getView().getModel("oListHU").getData();
			that.data = [];
			that.getView().getModel("oListHU").setData(that.data);
			that.getView().getModel("oListHU").refresh(true);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ScanHU", {});
			// var oTable = this.getView().byId("idtable");
			// var oModel = oTable.getModel("oTableModelAlias");
			// oModel.setData({});
			// oModel.refresh(true);
			// window.location.reload(true);
			// var oBusy = sap.m.BusyDialog();
			// oBusy.open();
			// oBusy.close();

		},

		// onPressRM : function(e){
		// 	  var that = this;
		//       var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		//         oRouter.navTo("RMPickReturn",{});
		// },
		// onPick: function (e) {
		// 	var that = this;
		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oRouter.navTo("Pick", {});
		// },
		// onReturn: function (e) {
		// 	var that = this;
		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oRouter.navTo("Return", {});
		// },
		// onRMPutAway: function (e) {
		// 	var that = this;
		// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	oRouter.navTo("PutAway", {});
		// },

		onPick: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Pick", {});
		},
		onReturn: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Return", {});
		},
		onRMPutAway: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PutAway", {});
		},

		/*Stock Overview*/
		onPressPlantScreen: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PlantScreen", {});
		},

		onPressWarehouseScreen: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("WarehouseScreen", {});
		},
		onPressFGPick: function (e) {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
			oRouter.navTo("ScanDelNo", {});
		},
		onPressBinToBin: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("BinToBin", {});
		},
		onPhysicalInventory: function (e) {
			// var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PlantStorageLoc", {});
		},
		onInventoryPress: function (e) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("InventoryPlntStrloc", {});
		}

	});
});