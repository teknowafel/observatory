const tableparser = require("table-parser"); // We need table parser to parse the output from df
const sh = require("sh"); // We need sh to run the df command

module.exports = (app) => {
    app.get("/disks", (req, res) => { // Disks endpoint for disk capacity info
        sh(`chroot /host "df" "-h" "--type" "btrfs" "--type" "ext4" "--type" "ext3" "--type" "ext2" "--type" "vfat" "--type" "zfs" "--type" "iso9660"`).result((output) => { // Run the df command for all filesystems (not swap)
            let disks = []; // Create an empty array to hold the disks
            const parsed = tableparser.parse(output); // Parse the output from df
            parsed.forEach((fs) => { // Iterate through the filesystems from the df command
                disks.push( // Add the disk to the array
                    {
                        "fs": `${fs.Filesystem[0]} at ${fs.Mounted[0]}`, // Mountpoint of the disk
                        "capacity": `${fs.Used[0]}/${fs.Size[0]}`, // Usage of the disk in bytes
                        "percent": fs['Use%'][0].slice(0, -1) // Usage of the disk in percentage
                    }
                )
            });

            res.send(disks); // Send the array of disks in the response
        });
    });
}