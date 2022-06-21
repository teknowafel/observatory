const cpu = require("cpu-stats");

module.exports = (app) => {
    app.get("/cpu", (req, res) => {
        cpu(1000, (error, result) => {
            total = 0;
            cores = []
            if (error){
                console.log("error getting cpu stats");
            }
            result.forEach((item) => {
                cores.push(Math.trunc(item.cpu));
                total += Math.trunc(item.cpu);
            })
            avg = Math.trunc(total / cores.length);
            res.send(
                {
                    "average": avg,
                    "cores": cores
                }
            )
        });
    })
}