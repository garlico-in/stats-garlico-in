
<h1 align="center">
  <br>
  <a href="https://www.garlico.in"><img src="https://stats.garlico.in/images/grlc-mining.png" alt="The Garlicoin Federation" width="200"></a>
  <br>
  The Garlicoin Federation Pool
  <br>
</h1>

<h4 align="center">A minimalist <a href="http://garlicoin.io" target="_blank">Garlicoin</a> pool to fund development.</h4>



<p align="center">
  <a href="https://discord.gg/zmUTZtUPXT">
    <img src="https://img.shields.io/badge/Discord-purple?style=for-the-badge&logo=discord&logoColor=white" alt="Garlicoin Discord (GRLC'Cord)"/>
  </a><br>
  <a href="#pool-details">Pool Details</a> •
  <a href="#how-to-mine">How To Mine</a> •
  <a href="#servers">Servers</a> •
  <a href="#downloads">Downloads</a> •
  <a href="#credits">Credits</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a> •
  <a href="#fork">Fork</a>
</p>

<p align="center">
  <img src="https://www.modernanalyst.com/Portals/0/Public%20Uploads%204/Beta-Launch-2-Fotolia_30472900_XS.jpg" width="200"></a>
</p>

## Pool Details

* (Coming Soon) Donation f=port for Garlicoin Development
* 0% Fee for everyone
* 4 regional servers for fewer stale shares
* Support for all GRLC address types
* Solo "pool" option


## How To Mine

To mine you will need a mining client and a Garlicoin address from a Garlicoin wallet.  Due to the volume of transactions, it is recommended you use Garlicoin Core for this wallet.  Other clients will may have trouble downloading the transaction data, but your coins will be safe.

For a mining client, the Federation Pool recommends ccminer or sgminer by [@FancyIX](https://github.com/fancyIX).  Links for each can be found in the <a href="#downloads">downloads</a> section.

```bash
# CCMINER
$ ccminer -a allium -o stratum+tcp://pool.garlico.in:3002 -u grlc1qu2svj6l7qkk2esv5tx9csdxfsru7l90ys9u38u --max-temp=85 --submit-stale

# SGMINER
$ sgminer --algorithm allium -o stratum+tcp://pool.garlico.in:3002 -u grlc1qu2svj6l7qkk2esv5tx9csdxfsru7l90ys9u38u -p x -I 15
```

> **Note**
> If you're using Windows, you will need to include the file extension for the executable

## Servers

```bash
# Global DNS
* stratum+tcp://pool.garlico.in:3002

# United States (West Coast)
* stratum+tcp://us.node.garlico.in:3002

# Canada (Central)
* stratum+tcp://ca.node.garlico.in:3002

# Singapore
* stratum+tcp://sg.node.garlico.in:3002


# Port 3002 - TCP Pooled Vardiff (I:4, Mi:1, Mx:25)
# Port 3002 - TLS Pooled Vardiff (I:4, Mi:1, Mx:25)
# Port 3069 - TCP Solo Vardiff (I:25, Mi:1, Mx:512)

# API
* http://pool.garlico.in:3001
```

## Downloads
<p align="center">
<a href="https://github.com/fancyIX/ccminer/releases">
    <img src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/05061935269l.jpg" width="100" alt="CCMINER by FANCYIX"/>
</a>
<a href="https://github.com/fancyIX/ccminer/releases">
    <img src="https://www.dsogaming.com/wp-content/uploads/2020/09/AMD-RDNA-2-temp.jpg" width="100" alt="CCMINER by FANCYIX"/>
</a>
</p>


## Credits

This software uses the following open source packages:

- [FreshGRLC](http://pool.freshgrlc.net)
- [@nuc1e4r5n4k3 ](https://github.com/nuc1e4r5n4k3)
- [@OrangeDrangon ](https://github.com/OrangeDrangon)
- [@MaxPuig](https://github.com/MaxPuig)
- [GRLC-Tech/Garlicoin.info](https://github.com/GRLC-tech)
- [@xhissy](https://github.com/xhissy)
- [The Garlicoin Federation](https://garlicoin.io/garlicoin-federation/)
- [@Studio271 a.k.a. Anime Garlicoin](https://github.com/AnimeGarlicoin)
- [Silver Tongue Studio](https://www.twitch.tv/silver_tongue_studio)
- [Pa7i & GarlicSquire](https://garlicsquire.com/)
- [@notafoolsgarden](https://github.com/notafoolsgarden)
- [Kryptonite](https://github.com/ryan-shaw)
- [darrienkek](https://www.twitch.tv/darrienkek)
- [Blinkhash](https://blinkhash.com/)
- [Matthew Little (@zone117x), Creator of NOMP](https://github.com/zone117x)
- [Nicsa, Creator of Blinkhash](https://github.com/blinkhash)
- [@danielradosa](https://github.com/danielradosa)
- And many more who supported this effort!

## Support

For support, please join <a href="http://garlicoin.io" target="_blank">the Garlicoin Discord (GRLC'Cord)</a>

## License

[GPL](https://www.gnu.org/licenses/gpl-3.0.en.html)

## Fork

To fork the website, update the frontend and API endpoints.

```bash
# Clone the repo
$ git clone https://github.com/garlico-in/stats-garlico-in.git

# Install
$ npm install

# Start the webapp
$ npm start run

## OR

# Build with Docker Compose
$ sudo docker-compose -f docker-compose.yml build

#Start the container
$ sudo docker-compose -f docker-compose.yml up -d
```

To launch your own pool or private pool, you can use the [Blinkhash](https://github.com/blinkhash/foundation-v1-server) node.js fork of NOMP.  You can find the documentation [here](https://blinkhash.com/docs).
<br>

---

> [www.garlico.in](https://www.garlico.in) &nbsp;&middot;&nbsp;
> GitHub [@garlico-in](https://github.com/garlico-in/) &nbsp;&middot;&nbsp;
> Github [@HoorayJorge](https://github.com/HoorayJorge/)



