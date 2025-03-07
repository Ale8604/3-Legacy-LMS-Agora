import React, { useState, useEffect } from "react";
import style from "../../CreateActivity.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../../api/index";
import { Step } from "../step/Step";
import { MdExpandMore } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { Button } from "../../../../components/buttons/Button/Button";
const initWorkbook = {
  titleWorkbook: "",
  pictureWorkbook: "",
  descriptionWorkbook: "",
  tagsWorkbook: [],
  basicNotions: "",
  environmentalReq: [],
  contextReq: [],
  steps: [],
  challenge: "",
  resources: [],
  date: "",
};

export function ViewWorkbook(props) {
  const { teacher } = props;
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;
  const params = useParams();
  const workbookID = params.id;
  let navigate = useNavigate();

  const [workbook, setWorkbook] = useState(initWorkbook);
  const [image, setImage] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [infoStep, setInfoStep] = useState({ index: "", stepShow: "" });
  const {
    titleWorkbook,
    descriptionWorkbook,
    tagsWorkbook,
    basicNotions,
    environmentalReq,
    contextReq,
    steps,
    challenge,
    resources,
    date,
  } = workbook;

  const fetchWorkbook = async (url, id) => {
    const res = await apiAgora.get("/api/agora/get-workbook/" + url, {
      headers: { Authorization: id },
    });
    if (res.data) {
      res.data.date =
        new Date(res.data.date).toLocaleDateString("en-CA") +
        "T" +
        new Date(res.data.date).toLocaleTimeString();
      setWorkbook(res.data);
      setImage(res.data.pictureWorkbook);
    }
  };

  useEffect(() => {
    fetchWorkbook(workbookID, userID);
  }, [workbookID, userID]);

  // Show complete step information
  const handleInfoStep = (index, stepShow) => {
    setOpenInfo(!openInfo);
    setInfoStep({ index: index, stepShow: stepShow });
  };
  return (
    <div className={(style.formContainer, style.formContainerWorkbook)}>
      <div>
        <button className={style.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div className={style.wrapper}>
        <h2 className={style.typing_demo_view_Workbook}>Workbook</h2>
      </div>
      {!teacher ? (
        <div className={style.buttonDelivery}>
          <Button
            title="Entregar workbook"
            link={`/delivery/workbook/${workbookID}`}
          />
        </div>
      ) : null}

      <div className={style.form}>
        <div className={style.container}>
          <div className={style.containerOne}>
            {/*     Image */}
            <div>
              <div className={style.img_preview}>
                <img
                  className={style.image}
                  src={image}
                  alt="Imagen del workbook"
                />
              </div>
            </div>
            {/* Resources */}

            <div className={style.InitialContainer}>
              <h3>Recursos</h3>
              <div>
                {resources.length !== 0
                  ? resources.map((item, index) => (
                      <div className={style.tagContainer} key={index}>
                        <AiOutlineLink className={style.linkIcon} size={30} />
                        <div className={style.tagText}>
                          <a
                            className={style.tag}
                            href={item.link}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.nameLink}
                          </a>
                        </div>
                        <AiOutlineLink className={style.linkIcon} size={30} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/* Basic Notions  */}
            <div className={style.contextContainer}>
              <h3>Nociones básicas</h3>
              <p>{basicNotions}</p>
            </div>
          </div>
          <div className={style.containerTwo}>
            {/* Name*/}
            <div className={style.InitialContainer}>
              <h3>Nombre del workbook</h3>
              <h4>{titleWorkbook}</h4>
              {/* Description */}
              <h3>Descripción del proyecto</h3>
              <p>{descriptionWorkbook}</p>
              {/* Tags */}
              <div>
                <h3>Etiquetas del Workbook</h3>
                <div className={style.tagsList}>
                  {tagsWorkbook.length !== 0
                    ? tagsWorkbook.map((item, index) => (
                        <div className={style.tagContainer} key={index}>
                          <p className={style.tag}>{item}</p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            {/* Delivery date */}
            <div>
              <h3>Fecha y hora de entrega</h3>
              <div className={style.dateTimeDelivery}>
                <input
                  placeholder="Fecha de entrega"
                  type="datetime-local"
                  name="date"
                  value={date}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.line}></div>
        {/*  Environmental requirements */}
        <div className={style.deliveryContainer}>
          <div className={style.summaryProject}>
            <h3>Entorno de desarrollo</h3>
            <div className={(style.tagsList, style.concepts)}>
              {environmentalReq.length !== 0
                ? environmentalReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <p className={style.tag}>{item}</p>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className={style.summaryProject}>
            <h3>Conceptos a investigar</h3>
            <div className={style.concepts}>
              {contextReq.length !== 0
                ? contextReq.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>{item}</p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {/*Show steps*/}
          <div className={style.summaryProject}>
            <h3>Pasos</h3>
            <div>
              {steps.length !== 0
                ? steps.map((item, index) => (
                    <div className={style.tagContainer} key={index}>
                      <div className={style.tagText}>
                        <p className={style.tag}>
                          <b>Paso número {index + 1}:</b> {item.descriptionStep}
                        </p>
                      </div>

                      <div className={style.buttonsStep}>
                        <button
                          type="button"
                          onClick={() => handleInfoStep(index, item)}
                        >
                          <MdExpandMore size={30} />
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>

          {/* If open info  is true, display information*/}
          {openInfo && steps.length !== 0 ? (
            <div className={style.stepsContainer}>
              <Step info={infoStep} setOpenInfo={setOpenInfo} />
            </div>
          ) : (
            ""
          )}

          {/* Challenge */}
          <div className={style.summaryProject}>
            <h3>Reto</h3>
            <div className={style.tagsProject}>
              <p>{challenge}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
