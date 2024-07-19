import React from "react";
import axios from "axios";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";
import {toast} from "react-toastify";
import {useState} from "react";

const Table = styled.table`
	width: 100%;
	background-color: #fff;
	padding: 20px;
	box-shadow: 0px 0px 5px #ccc;
	border-radius: 5px;
	max-width: 1120px;
	margin: 20px auto;
	word-brack: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
	text-align: start;
	border-bottom: inset;
	padding-bottom: 5px;

	@media (max-width: 500px) {
		${(props) => props.onlyWeb && "display: none;"}
	}
`;

export const Td = styled.td`
	padding-top: 15px;
	text-align: ${(props) => (props.alignCenter ? "center" : "start")};
	width: ${(props) => (props.width ? props.width : "auto")};

	@media (max-width: 500px) {
		${(props) => props.onlyWeb && "display: none;"}
	}
`;



const Grid = ({tasks, setTasks, setOnEdit}) => {
	const handleEdit = (item) => {
		setOnEdit(item);
	}

	const handleCheck = async (task_id) => {
		await axios
			.put(`http://localhost:5000/tasks/${task_id.task_id}`, {
				title: task_id.title,
				description: task_id.description,
				finished: task_id.finished ? 0 : 1

			})
			.then(({data}) => {
				setTasks(tasks.map((task) => (task.task_id === task_id.task_id ? {...task, finished: !task.finished} : task)));
				toast.success(data);
			})
			.catch(({data}) => toast.error(data));

		setOnEdit(null);
	};

	const handleDelete = async (task_id) => {
		await axios
			.delete("http://localhost:5000/tasks/" + task_id)
			.then(({data}) => {
				const newArray = tasks.filter((task) => task.task_id !== task_id);

				setTasks(newArray);
				toast.success(data);
			})
			.catch(({data}) => toast.error(data));

		setOnEdit(null);
	};

	const ToggleIcon = ({ finished, onToggle }) => {

		return (
		  <span onClick={onToggle}>
			{finished ? <ImRadioChecked /> : <ImRadioUnchecked />}
		  </span>
		);
	  };

	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Task</Th>
					<Th>Description</Th>
					<Th>Status</Th>
					<Th>Action</Th>
				</Tr>
			</Thead>
			<Tbody>
				{tasks.map((item, i) => (
					<Tr key={item.task_id}>
						<Td width="30%">{item.title}</Td>
						<Td width="30%">{item.description}</Td>
						<Td width="30%">
							{item.finished ? 'Finished' : 'In Progress'}
							<ToggleIcon finished={item.finished} onToggle={() => handleCheck(item)} />
						</Td>
						<Td alignCenter width="5%">
							<FaEdit onClick={() => handleEdit(item)} />
						</Td>
						<Td alignCenter width="5%">
							<FaTrash onClick={() => handleDelete(item.task_id)} />
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default Grid;
