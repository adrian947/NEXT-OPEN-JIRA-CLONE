import type { NextPage } from "next";
import { Grid, Card, CardHeader, CardContent } from "@mui/material";
import { Layout } from "../components/layout/Layout";
import { EntryList } from "../components/ui/EntryList";
import { NewEntry } from "../components/ui/NewEntry";

const Home: NextPage = () => {

  return (
    <Layout title='Home - jira Clone'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title='Pending' />
            <NewEntry />
            <EntryList status={"pending"}/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title='Progress' />
            <EntryList status={"inProgress"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title='Complete' />
            <EntryList status={"complete"}/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
