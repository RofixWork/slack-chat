import React, { Component } from "react";
import styled from "styled-components";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineSend } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
const Audio = styled.div`
  border-top: 1px solid whitesmoke;
  padding: 10px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 80%;
  margin: 0 auto;
`;

class RecordAudio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordState: null,
      audio: null,
      progressBar: null,
    };
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
      audio: null,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };
  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE,
    });
  };

  send = () => {
    const { audio } = this.state;

    if (!audio) return false;

    const storageRef = ref(storage, `audios/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, audio.blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        this.setState({
          progressBar: progress,
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await addDoc(collection(db, "messages"), {
            audio: url,
            picture: this.props.photoURL,
            username: this.props.displayName,
            user: this.props.uid,
            timestamp: serverTimestamp(),
            roomId: this.props.roomId,
          });
        });
        this.props.setAudioArea(false);
      }
    );
  };

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    this.setState({
      audio: audioData,
    });
  };

  render() {
    const { recordState, audio, progressBar } = this.state;

    return (
      <div>
        <Audio>
          <AudioReactRecorder
            canvasHeight={30}
            backgroundColor="#f4f4f4"
            state={recordState}
            onStop={this.onStop}
          />

          <Button sx={{ ml: "5px" }} variant="contained" onClick={this.start}>
            Start
          </Button>
          <Button
            sx={{ ml: "5px" }}
            variant="contained"
            onClick={this.pause}
            color="info"
          >
            Pause
          </Button>
          <Button
            sx={{ ml: "5px" }}
            variant="contained"
            color="error"
            onClick={this.stop}
          >
            Stop
          </Button>
        </Audio>
        {audio && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            py="10px"
          >
            <audio controls src={audio.url}></audio>
            <IconButton size="medium" color="success" onClick={this.send}>
              <AiOutlineSend />
            </IconButton>
            <IconButton
              size="medium"
              color="error"
              onClick={() => this.props.setAudioArea(false)}
            >
              <CgClose />
            </IconButton>
            <h3>{Math.round(progressBar)}%</h3>
          </Stack>
        )}
      </div>
    );
  }
}

export default RecordAudio;
