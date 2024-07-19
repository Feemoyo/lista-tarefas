import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	width: 120px;
	padding: 0 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	border: none;
	background-color: #2c73d2;
	color: white;
	height: 42px;
`;

const Form = ({getTasks, onEdit, setOnEdit}) => {
	const ref = useRef();

	useEffect(() => {
		if (onEdit) {
			const task = ref.current;
			task.title.value = onEdit.title;
			task.description.value = onEdit.description;
			task.finished.checked = onEdit.finished ? true : false;
		}
	}, [onEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const task = ref.current;
		if (!task.title.value){
			return toast.warn('Please fill in title field.');
		}


		if (task.finished.checked) {
			task.finished.value = 1;
		}
		else {
			task.finished.value = 0;
		}

		if (onEdit) {
			await axios
				.put("http://localhost:5000/tasks/" + onEdit.task_id, {
					title: task.title.value,
					description: task.description.value,
					finished: task.finished.value
				})
				.then(({data}) => toast.success(data))
				.catch(({data}) => toast.error(data));
		} else {
			await axios
				.post("http://localhost:5000/tasks/", {
					title: task.title.value,
					description: task.description.value,
					finished: task.finished.value
				})
				.then(({data}) => toast.success(data))
				.catch(({data}) => toast.error(data));
		}

		task.title.value = "";
		task.description.value = "";
		task.finished.checked = false;

		setOnEdit(null);
		getTasks();
	};

	return (
		<FormContainer ref={ref} onSubmit={handleSubmit}>
			<InputArea>
				<Label>Title</Label>
				<Input name="title"/>
			</InputArea>
			<InputArea>
				<Label>Description</Label>
				<Input name="description"/>
			</InputArea>
			<InputArea>
				<Label>Finished</Label>
				<Input name="finished" type="checkbox" />
			</InputArea>

			<Button type="submit">Save</Button>
		</FormContainer>
	);
};

export default Form;