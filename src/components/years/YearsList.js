import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./YearsList.css";
import ConcertManager from "../../modules/ConcertManager";
import { Table } from "reactstrap";

const YearsList = (props) => {
  const [years, setYears] = useState([]);
  const [dates, setDates] = useState([]);
  const [yearCounter, setYearCounter] = useState([]);
  const [totalYears, setTotalYears] = useState([])

  const userConcerts = () => {
    ConcertManager.getUserConcerts(sessionStorage.activeUser).then((concerts) =>
      console.log(concerts)
    );
  };

  useEffect(() => {
    ConcertManager.getUserConcerts(sessionStorage.activeUser).then(
      (concerts) => {
        // console.log("concerts", concerts)
        const datesList = concerts.map((concert) => {
          // const yearsArray = concert.date
          // console.log("yearsArray", yearsArray)
          // setYears(yearsArray)

          return {
            id: concert.id,
            date: concert.date,
          };
        });
        // console.log("datesList", datesList)
        // setDates(datesList)
        const yearsList = datesList.map((dateObj) => {
          const yearsArray = dateObj.date;
          const year = yearsArray.slice(0, 4);
          return year;
          // dateObj.year = year
          // return {

          //   date: parseInt(dateObj.year)
          // }
        });
        // console.log("yearsList", yearsList)

        function getOccurence(array, value) {
          let count = 0;
          array.forEach((v) => v === value && count++);
          return count;
        }

        const testYear = [];
        testYear.push(getOccurence(yearsList, "2015"));
        testYear.push(getOccurence(yearsList, "2016"));
        testYear.push(getOccurence(yearsList, "2017"));
        testYear.push(getOccurence(yearsList, "2018"));
        testYear.push(getOccurence(yearsList, "2019"));
        testYear.push(getOccurence(yearsList, "2020"));
        // console.log(testYear)

        setYears(testYear);

        function getOccurence(array, value) {
          let count = 0;
          array.forEach((v) => v === value && count++);
          return count;
        }
      }
    );
  }, []);

  useEffect(() => {
    ConcertManager.getUserConcerts(sessionStorage.activeUser).then(
      (concerts) => {
        console.log("concerts", concerts);
        const datesList = concerts.map((concert) => {
          // const yearsArray = concert.date
          // console.log("yearsArray", yearsArray)
          // setYears(yearsArray)

          return {
            id: concert.id,
            date: concert.date,
          };
        });
        // console.log("datesList", datesList)
        // setDates(datesList)
        const yearsList = datesList.map((dateObj) => {
          const yearsArray = dateObj.date;
          const year = yearsArray.slice(0, 4);
          console.log(year);
          return year;
        });
        console.log("yearsList", yearsList);

        // const countResults = [
        //   ...yearsList
        //     .reduce((mp, o) => {
        //       const key = ([o]);
        //       if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
        //       mp.get(key).count++;
        //       return mp;
        //     }, new Map())
        //     .values(),
        // ];

        // console.log(countResults)

        function getOccurence(array, value) {
          let count = 0;
          array.forEach((v) => v === value && count++);
          return count;
        }

        const yearCount = [];
        yearCount.push({ year: 2020, count: getOccurence(yearsList, "2020") });
        yearCount.push({ year: 2019, count: getOccurence(yearsList, "2019") });
        yearCount.push({ year: 2018, count: getOccurence(yearsList, "2018") });
        yearCount.push({ year: 2017, count: getOccurence(yearsList, "2017") });
        // yearCount.push({ year: 2016, count: getOccurence(yearsList, "2016")})
        console.log(yearCount);

        const yearsWithCount = yearCount.map((yearObj) => {
          if (yearObj.count != 0) {
            return yearObj;
            // setYearCounter(yearObj)
          }
        });
        console.log(yearsWithCount);
        setYearCounter(yearsWithCount);

        const distinctYears = [...new Set(yearsList)];
        console.log(distinctYears);
        setTotalYears(distinctYears.length)

        function getOccurence(array, value) {
          let count = 0;
          array.forEach((v) => v === value && count++);
          return count;
        }

        // const testYear = []
        // testYear.push(getOccurence(yearsList, "2015"))
        // testYear.push(getOccurence(yearsList, "2016"))
        // testYear.push(getOccurence(yearsList, "2017"))
        // testYear.push(getOccurence(yearsList, "2018"))
        // testYear.push(getOccurence(yearsList, "2019"))
        // testYear.push(getOccurence(yearsList, "2020"))
        // console.log(testYear)

        // setYears(testYear)

        // function getOccurence(array, value) {
        //   let count = 0;
        //   array.forEach((v) => (v === value && count++));
        //   return count
        // }
      }
    );
  }, []);

  const data = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Concerts",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#007BFF",
        // changes chart line color
        borderColor: "rgba(255, 255, 255)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(255, 165, 0)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: years,
      },
    ],
  };

  return (
    <>
      <div className="years-list-container">
        <div className="years-list-table">
          <Table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Concerts Seen</th>
              </tr>
            </thead>
            <tbody>
              {yearCounter.map((yearThing) => (
                <tr>
                  <td>{yearThing.year}</td>
                  <td>{yearThing.count} concerts</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="years-list-chart-div">
          <div id="years-chart">
            <h2 className="years-list-h2">You have seen concerts during {totalYears} years. </h2>
            <Line
              data={data}
              id="concert-chart"
              options={{ maintainAspectRatio: true }}
              width={800}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default YearsList;
