# covid19-district-reports

Example app for reporting Covid-19 case numbers to a stub API.

## The API

The API can be launched in a docker container and exposes port 7000.

    docker run --rm -p 8070:7000 covid19-district-reports/backend

This starts the container and publishes the api at port 8070. A request to http://localhost:8070/districts?federalStateId=1 will return a list of districts.
The endpoints are:

- [GET] /federal-states
- [GET] /districts?federalStateId=<id from above endpoint>
- [GET] /reports
- [POST] /reports

The reports structure for a post is:

    {
        district_id: number
        count: number
    }

To create a new report with curl it looks like this

    curl -X POST localhost:7000/reports -d '{ "district_id":1, "count":10 }'
