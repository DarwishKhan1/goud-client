import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getEvents, deleteEventFromDb } from "../../APIS/apis";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import EventsTable from "./eventsTable";
import Pagination from "../Common/Pagination";

class Events extends Component {
  state = { loading: true, events: [], pageOfEvents: [] };

  async componentDidMount() {
    try {
      const events = await getEvents();
      this.setState({ loading: false, events });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  deleteEventeHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;
    try {
      this.setState({ loading: true });
      let allevents = [...this.state.events];
      allevents = allevents.filter((itm) => itm._id !== id);
      await deleteEventFromDb(id, image);
      this.setState({ loading: false, events: allevents });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfEvents: pageOfItems });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Events Data</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/events/add"}
              state={{ event: null }}
            >
              Create Event
            </Link>

            <EventsTable
              data={this.state.pageOfEvents}
              deleteEvent={this.deleteEventeHandler}
            />

            <Pagination
              items={this.state.events}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Events;
