function filter(stateFetched, costParam, areaParam) {
        let filtered = {};
        if (stateFetched) {
            if (areaParam){
                if (costParam){
                    landBank.findAll({
                        where: {
                            State: stateFetched,
                            Area: areaParam,
                            Cost: costParam
                        }
                    }).then((lands) => {
                            console.log(lands)
                            filtered["success"] = true;
                            filtered["code"] = 200;
                            filtered["message"] = "Lands for the corressponding filter fetched successfully";
                            filtered["data"] = [];
                            Object.keys(lands).forEach((key) => {
                                // console.log(key, lands[key]["dataValues"]);
                                filtered["data"].push(lands[key]["dataValues"]);
                            });
                            // console.log('***************in recent function*********');

                            console.log(filtered);
                            return (filtered);
                        }
                    ).catch((err) => console.log("Error: No land found"))
                }
                else {
                    landBank.findAll({
                        where: {
                            State: stateFetched,
                            Cost: costParam
                        }
                    }).then((lands) => {
                            console.log(lands)
                            filtered["success"] = true;
                            filtered["code"] = 200;
                            filtered["message"] = "Lands for the corressponding filter fetched successfully";
                            filtered["data"] = [];
                            Object.keys(lands).forEach((key) => {
                                // console.log(key, lands[key]["dataValues"]);
                                filtered["data"].push(lands[key]["dataValues"]);
                            });
                            // console.log('***************in recent function*********');

                            console.log(filtered);
                            return (filtered);
                        }
                    ).catch((err) => console.log("Error: No land found"))
                }
            }
        }
}
