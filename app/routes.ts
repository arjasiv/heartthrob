import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layout/layout.tsx", [
    route("game", "routes/game.tsx", { id: "emptyGame" }),
    route("game/:round", "routes/game.tsx"),
    layout("layout/createLayout.tsx", [
      index("routes/create.tsx"),
      route("/create", "./routes/create.tsx", { id: "create" }),
      route("/create/traits", "./routes/traits.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
