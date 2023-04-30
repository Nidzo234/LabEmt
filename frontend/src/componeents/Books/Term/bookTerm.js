import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return(
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.author.name}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger m-1"}
                   onClick={() => props.onDelete(props.term.id)}
                >Delete</a>
                <Link className={"btn btn-success m-1"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>Edit</Link>
                <a title={"Mark as taken"} className={"btn btn-secondary m-1"}
                   onClick={() => props.onMarkAsTaken(props.term.id)}
                >Mark as taken</a>
            </td>
        </tr>
    )
}

export default bookTerm;