const tableparser = require("table-parser");
const sh = require("sh");

module.exports = (app) => {
    app.get("/disks", (req, res) => {
        sh("df -h --type btrfs --type ext4 --type ext3 --type ext2 --type vfat --type zfs --type iso9660").result((output) => {
            let disks = [];
            const parsed = tableparser.parse(output);
            parsed.forEach((fs) => {
                disks.push(
                    {
                        "fs": `${fs.Filesystem[0]} at ${fs.Mounted[0]}`,
                        "capacity": `${fs.Used[0]}/${fs.Size[0]}`,
                        "percent": fs['Use%'][0].slice(0, -1)
                    }
                )
            });

            res.send(disks);
        });
    });
}