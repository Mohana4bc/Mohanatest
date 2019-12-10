sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
], function (Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("com.axium.Axium.controller.BinScanFGPutaway", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.axium.Axium.view.BinScanFGPutaway
		 */
		onInit: function () {
			this.odataService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZWM_GW_RFSCREENS_SRV/", true);
			this.oList = this.getView().byId("idList");
			this.aData = [];
			this.aDataCpy = [];
			this.result = {};
			this.result.items = [];
			this.saveFlag = false;

		},
		onBinScan: function () {
			var that = this;
			var sHistory = History.getInstance();
			var sPreviousHash = sHistory.getPreviousHash();
			var binNo = that.getView().byId("fgPutAwayBinId").getValue();
			if (binNo === "") {
				MessageBox.error("Please Scan Bin Number");
			} else {
				setTimeout(function () {
					if (sPreviousHash !== undefined) {
						that.odataService.read("/FGPutawayBinValidation?BinNumber='" + binNo + "'", null, null, false, function (response) {

							if (binNo === "") {

							} else {

								if (response.Message === "Valid Destination") {
									MessageBox.show("Are you sure you want to transfer these HU/s to bin '" + binNo + "'", {
										icon: MessageBox.Icon.QUESTION,
										title: "Bin Transfer Confirmation",
										actions: [MessageBox.Action.YES, MessageBox.Action.NO],
										onClose: function (oAction) {
											if (oAction === sap.m.MessageBox.Action.YES) {
												// console.log()

												that.onSubmit();

											} else {
												that.getView().byId("fgPutAwayBinId").setValue("");
											}
										}

									});

								}
							}

							if (response.Message === "Invalid Destination") {
								MessageBox.error("Please Scan a Correct Bin", {
									title: "Error",
									onClose: null,
									styleClass: "",
									initialFocus: null,
									textDirection: sap.ui.core.TextDirection.Inherit
								});
								that.getView().byId("fgPutAwayBinId").setValue("");

							}

						});

					} else {

						var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
						sRouter.navTo("ScanHU", true);
					}
				}, 1500);
			}

		},
		onSubmit: function () {
			var oRef = this;
			var result = oRef.getOwnerComponent().getModel("oListHU").getData();
			if (result.length === 0) {
				MessageBox.error("Please Scan HU's");
			} else {
				var binNo = oRef.getView().byId("fgPutAwayBinId").getValue();
				if (binNo === "") {
					MessageBox.error("Please Scan Bin Number");
				} else {
					var data = {};
					var flag = true;
					data.NavFGHeaderFGItems = [];
					$.each(result.HUSet, function (index, item) {
						var temp = {};
						temp.ExternalHU = item.ExternalHU;
						temp.BinNumber = binNo;
						temp.Message = "";
						data.NavFGHeaderFGItems.push(temp);
					});

					if (flag === true) {
						this.odataService.create("/FGPutAwayHeaderSet", data, null, function (odata, response) {
							MessageBox.success("HU Transferred To Warehouse Successfully", {
								title: "Success",
								Action: "OK",
								onClose: function (oAction) {
									if (oAction === sap.m.MessageBox.Action.OK) {
										var oRef = this;

										var aData = oRef.getView().getModel("oListHU").getData();
										var aDataCpy = oRef.getView().getModel("oListHUCpy").getData();
										oRef.aData = [];
										oRef.aDataCpy = [];
										oRef.getView().getModel("oListHU").setData(oRef.aData);
										oRef.getView().getModel("oListHUCpy").setData(oRef.aDataCpy);
										oRef.getView().getModel("oListHU").refresh(true);
										oRef.getView().getModel("oListHUCpy").refresh(true);

										oRef.getView().byId("fgPutAwayBinId").setValue("");
										this.saveFlag = true;

										var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
										sRouter.navTo("ScanHU", true);

									}
								}.bind(oRef),
								styleClass: "",
								initialFocus: null,
								textDirection: sap.ui.core.TextDirection.Inherit
							});

						}, function (odata, response) {

							var errorResponse = JSON.parse(odata.response.body);
							var errorDetails = errorResponse.error.innererror.errordetails;
							// var errorString = "";
							var jsonParse = JSON.parse(odata.response.body);
							var err = jsonParse.error;
							var msg = err.message.value;
							$.each(errorDetails, function (index, item) {
								if (index != errorDetails.length - 1) {
									var code = item.code.trim();
									var i = code.indexOf('/');
									var HU = code.slice(0, i);
									msg = msg + "\n" + HU + " " + item.message + "\n";
								}

							});

							MessageBox.error(msg, {
								title: "Error",
								Action: "CLOSE",
								onClose: function (oAction) {
									if (oAction === sap.m.MessageBox.Action.CLOSE) {
										oRef.getView().byId("fgPutAwayBinId").setValue("");
										this.saveFlag = true;
										var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
										sRouter.navTo("ScanHU", true);
									}

								}.bind(oRef),
								styleClass: "",
								initialFocus: null,
								textDirection: sap.ui.core.TextDirection.Inherit
							});
						});
					} else {
						MessageBox.information("Bin Number Missing");
					}
				}

			}
		},
		onPressBack: function () {
			var sRouter = sap.ui.core.UIComponent.getRouterFor(this);
			sRouter.navTo("ScanHU", true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.axium.Axium.view.BinScanFGPutaway
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.axium.Axium.view.BinScanFGPutaway
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.axium.Axium.view.BinScanFGPutaway
		 */
		//	onExit: function() {
		//
		//	}

	});

});