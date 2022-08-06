import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: false,
        },
        title: {
            display: false,

        },
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );


export const WebsiteDetails = () => {


    const history = createBrowserHistory();
    const [keywords, setKeywords] = useState();
    const [sites, setSites] = useState();
    const [data, setData] = useState();
    const [pata, setPata] = useState();
    const [yukselen, setYukselen] = useState();
    const [yukselenOran, setYukselenOran] = useState();
    const [dusen, setDusen] = useState();
    const [dusenOran, setDusenOran] = useState();
    const [sabit, setSabit] = useState();
    const [nodata, setNodata] = useState();
    const [select, setSelect] = useState(false);
    const user = useSelector((state) => state.user);
    const { id, site } = useParams();

    useEffect(() => {

   /*      if (user.loginStatus === false) {
            history.push('/login');
            history.go('/login');
            return
        } */
        const getWebsites = async () => {
            const res = await axios.get(`https://api.kuzeysoftware.com/seo/getwebsite/${id}`);
            setSites(res.data);
            const data = {
                datasets: [
                    {
                        label: '# of Votes',
                        data: [res.data[0].FIRST_3, res.data[0].FOURTO_TEN, res.data[0].TENTO_HUNDRED],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.4)',
                            'rgba(255, 206, 86, 0.4)',
                            'rgba(255, 99, 132, 0.4)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            setData(data);
        }
        getWebsites();
        const getKeywords = async () => {
            const res = await axios.get(`https://api.kuzeysoftware.com/seo/getkeywords/${id}`);
            console.log(res.data[0].LAST4.split(","))
            setKeywords(res.data);
            const plus = res.data.map((key) => key.LAST24.substring(0, 1) == "+");
            const ukselen = plus.filter(Boolean).length;
            setYukselen(ukselen);
            const negative = res.data.map((key) => key.LAST24.substring(0, 1) == "-");
            const usen = negative.filter(Boolean).length;
            setDusen(usen);
            const sifir = res.data.map((key) => key.LAST24.substring(0, 1) == "0");
            setSabit(sifir.filter(Boolean).length);
            const nodata = res.data.map((key) => key.LAST24.substring(0, 1) == "N");
            setNodata(nodata.filter(Boolean).length);
            if (yukselen !== 0) {
                setYukselenOran((ukselen * 100) / (ukselen + usen))
            } else {
                setYukselenOran('0');
            }
            if (dusen !== 0) {
                setDusenOran((usen * 100) / (ukselen + usen))
            } else {
                setDusenOran(0)
            }
           
          
        }
        getKeywords();
    }, [site])

    const selectAll = () => {
        setSelect(!select)
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((cb) => { cb.checked = !select; });
    }
    const checkSelect = () => {
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        const selected = [...checkboxes].filter((n) => n.checked === true).map((check) => check.value !== 'on' && check.value);
        if (selected[0] === false) {
            selected.shift();
        }
    }
    const setIcon = (key, fletter) => {
        if (fletter === "N" || fletter === "0") {
            return <em className="fa-solid fa-circle fs-1"></em>
        } else if (fletter === "+") {
            return <em style={{ color: 'green' }} className="fa-solid fa-circle-chevron-up fs-1">{key.substring(1)}</em>
        } else if (fletter === "-") {
            return <em style={{ color: 'red' }} className="fa-solid fa-circle-chevron-down fs-1">{key.substring(1)}</em>
        }
    }
    const setsData = (labels) => {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Sıra',
                    data: labels,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        return data;
    }
    return (
        <div>
            <div className="container-fluid sb1">
                <div className="row">
                    {/*== LOGO ==*/}
                    <div className="col-md-2 col-sm-3 col-xs-6 sb1-1">

                        <a href="/"  ><img src="https://i.ibb.co/3vQMw9J/kuzey-side-light-2.png" alt="" />
                        </a>
                    </div>

                    <div className="col-md-2 col-sm-3 col-xs-6">
                    </div>
                </div>
            </div>
            {/*== BODY CONTNAINER ==*/}
            <div className="container-fluid sb2">
                <div className="row">
                    <div className="sb2-1">
                        {/*== USER INFO ==*/}
                        <div className="sb2-12">
                            <ul>
                                <li><img src={user.currentUser.PROFILE_PICTURE} alt="profilResmi" />
                                </li>
                                <li style={{ color: '#000' }}>
                                    <span>Hoşgeldin</span> <br /> <b> {user.currentUser.FULLNAME}</b>
                                </li>
                                <li />
                            </ul>
                        </div>
                        <Navigation />
                    </div>
                    <div className="sb2-2">
                        <div className="sb2-2-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box-inn-sp">
                                        <div className="inn-title">
                                            <h4 onClick={() => checkSelect()}>Website Overview</h4><br />
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ width: '50%' }}>
                                                    <h4 className="text-center">Anahtar Kelime Pozisyonları</h4><br />
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '30%', marginLeft: '100px' }}>
                                                            {data && <Doughnut data={data} />}
                                                        </div>
                                                        <div style={{ verticalAlign: 'middle', fontSize: '16px', marginLeft: '50px', marginTop: '30px' }}>
                                                            <p><i style={{ color: 'rgba(54, 162, 235, 0.4)', marginRight: '5px', outline: '1px solid #999 ' }} className="fa-solid fa-square-full" />İlk 3'te: <b>{sites && sites[0].FIRST_3}</b></p> <hr />
                                                            <p><i style={{ color: 'rgba(255, 206, 86, 0.4)', marginRight: '5px', outline: '1px solid #999 ' }} className="fa-solid fa-square-full" />4-10 Arası: <b>{sites && sites[0].FOURTO_TEN}</b></p><hr />
                                                            <p><i style={{ color: 'rgba(255, 99, 132, 0.4)', marginRight: '5px', outline: '1px solid #999 ' }} className="fa-solid fa-square-full" />10-100 Arası: <b>{sites && sites[0].TENTO_HUNDRED}</b></p>
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="text-center" style={{ width: 'calc(100% - 40%)' }}>
                                                    <h4 >Anahtar Kelime Değişimleri</h4><br />
                                                    <span style={{ fontSize: '30px' }}>{yukselen ? yukselen : '0'} </span><em style={{ color: '#54bb49', fontSize: '18px', marginRight: 'calc(100% - 80%)' }} className="fa-solid fa-circle-chevron-up" />
                                                    <span style={{ fontSize: '30px' }}>{dusen ? dusen : '0'} </span><em style={{ color: '#d9534f', fontSize: '18px', marginRight: '5px' }} className="fa-solid fa-circle-chevron-down" /><br />
                                                    <span style={{ marginRight: 'calc(100% - 81%)' }}>Yükselen</span><span>Düşen</span><br /><br />
                                                    {yukselenOran && <ProgressBar style={{ width: 'calc(100% - 30%)', height: '3%', margin: '0 auto', backgroundColor: '#666' }} >
                                                        <ProgressBar animated style={{ backgroundColor: '#54bb49' }} variant="success" now={yukselenOran} key={1} />
                                                        <ProgressBar animated style={{ backgroundColor: '#d9534f' }} variant="success" now={dusenOran} key={2} />
                                                    </ProgressBar>} <br />
                                                    <p style={{ fontSize: '16px', color: '#333' }}><em style={{ marginRight: '5px' }} className="fa-solid fa-circle"></em> <b>{sabit ? (sabit + nodata) : nodata} kelime</b> sırasını koruyor.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sb2-2-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="box-inn-sp">
                                        <div className="inn-title">
                                            <h4 onClick={() => checkSelect()}>Keywords</h4>
                                            <button type="button" className="btn btn-primary">Kelime Ekle</button>
                                            <button type="button" className="btn btn-primary">Güncelle</button>
                                            <button type="button" className="btn btn-danger">Sil</button>

                                            {/* Dropdown Structure */}
                                        </div>
                                        <div className="tab-inn">
                                            <div className="table-responsive table-desi">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th><input onChange={() => selectAll()} type="checkbox" /></th>
                                                            <th>Anahtar Kelime</th>
                                                            <th>Sıra</th>
                                                            <th>G/H/A</th>
                                                            <th>En İyi</th>
                                                            <th>Grafik</th>
                                                            <th>Son Sorgu</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {keywords && keywords.map((key) =>
                                                            <tr key={key.ID}>
                                                                <th><input value={key.KEYWORD} type="checkbox" /></th>
                                                                <td>{key.KEYWORD}</td>
                                                                <td><a href="#"><span className="label label-primary">{key.CURRENT_RANK}</span></a>
                                                                </td>
                                                                <td> {setIcon(key.LAST24, key.LAST24.substring(0, 1))} {setIcon(key.LASTW, key.LASTW.substring(0, 1))} {setIcon(key.LASTM, key.LASTM.substring(0, 1))}</td>
                                                                <td> <span className="label label-primary">{key.BEST_RANK}</span></td>
                                                                <td style={{maxWidth : '30px'}}> <Line  options={options} data={setsData(key.LAST4.split(","))} /></td>
                                                                <td> Bugün</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
