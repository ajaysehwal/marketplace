"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Switch } from "../../../ui/switch";
import { SlideUp, FadeIn } from "../../../ui/motion";
import { X } from "lucide-react";
import { Separator } from "../../../ui/separator";
import {
  UpstreamSchema,
  UpstreamType,
  initialUpstreamForm,
} from "@/schemas/upstreams";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function CreateUpstreamForm() {
  const form = useForm<UpstreamType>({
    defaultValues: initialUpstreamForm,
    resolver: zodResolver(UpstreamSchema) as any,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nodes",
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append(initialUpstreamForm.nodes[0]);
    }
  }, [fields.length, append]);

  const onSubmit: SubmitHandler<UpstreamType> = (data) => {
    console.log(data);
  };

  const addHealthyStatusCode = (code: number) => {
    const currentCodes =
      form.getValues("health_check.healthy.http_statuses") || [];
    if (!currentCodes.includes(code)) {
      form.setValue("health_check.healthy.http_statuses", [
        ...currentCodes,
        code,
      ]);
    }
  };

  const removeHealthyStatusCode = (code: number) => {
    const currentCodes =
      form.getValues("health_check.healthy.http_statuses") || [];
    form.setValue(
      "health_check.healthy.http_statuses",
      currentCodes.filter((c) => c !== code)
    );
  };

  const addUnhealthyStatusCode = (code: number) => {
    const currentCodes =
      form.getValues("health_check.unhealthy.http_statuses") || [];
    if (!currentCodes.includes(code)) {
      form.setValue("health_check.unhealthy.http_statuses", [
        ...currentCodes,
        code,
      ]);
    }
  };

  const removeUnhealthyStatusCode = (code: number) => {
    const currentCodes =
      form.getValues("health_check.unhealthy.http_statuses") || [];
    form.setValue(
      "health_check.unhealthy.http_statuses",
      currentCodes.filter((c) => c !== code)
    );
  };

  return (
    <SlideUp>
      <ScrollArea className="w-full max-w-4xl mx-3 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-1">
            {/* Basic Information */}
            <SlideUp>
              <div className="space-y-4  rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the basic details of your upstream service
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter upstream name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter upstream URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </SlideUp>

            <Separator className="my-4" />

            {/* Nodes Section */}
            <SlideUp>
              <div className="space-y-4 rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">Nodes Configuration</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure the backend nodes for your upstream service (host,
                    port, weight)
                  </p>
                </div>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-4 p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`nodes.${index}.host`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Host" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`nodes.${index}.port`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Port"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`nodes.${index}.weight`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Weight"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        host: "",
                        port: 80,
                        weight: 1,
                      })
                    }
                    className="w-full"
                  >
                    Add Node
                  </Button>
                </div>
              </div>
            </SlideUp>

            <Separator className="my-4" />

            {/* Configuration */}
            <SlideUp>
              <div className="space-y-4 rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">Configuration</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure how your upstream service behaves
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="algorithm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Algorithm</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select algorithm" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="roundrobin">
                              Round Robin
                            </SelectItem>
                            <SelectItem value="leastconn">
                              Least Connection
                            </SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How requests are distributed across nodes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheme</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select scheme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="http">HTTP</SelectItem>
                            <SelectItem value="https">HTTPS</SelectItem>
                            <SelectItem value="tcp">TCP</SelectItem>
                            <SelectItem value="udp">UDP</SelectItem>
                            <SelectItem value="grpc">gRPC</SelectItem>
                            <SelectItem value="grpcs">gRPCs</SelectItem>
                            <SelectItem value="kafka">Kafka</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The protocol used for communication
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="retries"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retries</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Number of retries for failed requests
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </SlideUp>

            <Separator className="my-4" />

            {/* Timeout Settings */}
            <SlideUp>
              <div className="space-y-4 rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">Timeout Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure timeout settings for your upstream service
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="send_timeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Send Timeout (s)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="read_timeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Timeout (s)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="connect_timeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Connect Timeout (s)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </SlideUp>

            <Separator className="my-4" />

            {/* Keepalive Settings */}
            <SlideUp>
              <div className="space-y-4 rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">Keepalive Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Configure keepalive settings for your upstream service
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="keepalive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keepalive (s)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keepalive_requests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keepalive Requests</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keepalive_timeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keepalive Timeout (s)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </SlideUp>

            <Separator className="my-4" />

            {/* Health Check Section */}
            <SlideUp>
              <div className="space-y-4 rounded-lg bg-muted/5">
                <div>
                  <h2 className="text-lg font-semibold">
                    Health Check Configuration
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure health check settings for your upstream service
                  </p>
                </div>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="health_check.enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">
                          Enable Health Check
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch("health_check.enabled") && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="health_check.type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="http">HTTP</SelectItem>
                                  <SelectItem value="https">HTTPS</SelectItem>
                                  <SelectItem value="tcp">TCP</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="health_check.timeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timeout (seconds)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="health_check.host"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Host</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="health_check.port"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="health_check.http_path"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>HTTP Path</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Healthy Configuration */}
                      <SlideUp>
                        <div className="space-y-4 p-4 rounded-lg bg-muted/10">
                          <div>
                            <h3 className="text-lg font-semibold">
                              Healthy Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Configure settings for healthy nodes
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="health_check.healthy.interval"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Interval (seconds)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="health_check.healthy.successes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Successes</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="mt-4">
                            <FormLabel>Healthy HTTP Status Codes</FormLabel>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {form
                                .watch("health_check.healthy.http_statuses")
                                ?.map((code) => (
                                  <Badge
                                    key={code}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    {code}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-4 w-4 p-0"
                                      onClick={() =>
                                        removeHealthyStatusCode(code)
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                ))}
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addHealthyStatusCode(200)}
                                >
                                  200 OK
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addHealthyStatusCode(201)}
                                >
                                  201 Created
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addHealthyStatusCode(204)}
                                >
                                  204 No Content
                                </Button>
                              </div>
                              <Input
                                type="number"
                                placeholder="Add custom status code"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const value = Number(e.currentTarget.value);
                                    if (value >= 100 && value <= 599) {
                                      addHealthyStatusCode(value);
                                      e.currentTarget.value = "";
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </SlideUp>

                      {/* Unhealthy Configuration */}
                      <SlideUp>
                        <div className="space-y-4 p-4 rounded-lg bg-muted/10">
                          <div>
                            <h3 className="text-lg font-semibold">
                              Unhealthy Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Configure settings for unhealthy nodes
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="health_check.unhealthy.interval"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Interval (seconds)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="health_check.unhealthy.http_failures"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>HTTP Failures</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={1}
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="mt-4">
                            <FormLabel>Unhealthy HTTP Status Codes</FormLabel>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {form
                                .watch("health_check.unhealthy.http_statuses")
                                ?.map((code) => (
                                  <Badge
                                    key={code}
                                    variant="destructive"
                                    className="flex items-center gap-1"
                                  >
                                    {code}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-4 w-4 p-0"
                                      onClick={() =>
                                        removeUnhealthyStatusCode(code)
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                ))}
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addUnhealthyStatusCode(500)}
                                >
                                  500 Internal Server Error
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addUnhealthyStatusCode(502)}
                                >
                                  502 Bad Gateway
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addUnhealthyStatusCode(503)}
                                >
                                  503 Service Unavailable
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addUnhealthyStatusCode(504)}
                                >
                                  504 Gateway Timeout
                                </Button>
                              </div>
                              <Input
                                type="number"
                                placeholder="Add custom status code"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const value = Number(e.currentTarget.value);
                                    if (value >= 100 && value <= 599) {
                                      addUnhealthyStatusCode(value);
                                      e.currentTarget.value = "";
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </SlideUp>
                    </div>
                  )}
                </div>
              </div>
            </SlideUp>

            <FadeIn>
              <div className="flex justify-end space-x-4 pt-6">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Upstream</Button>
              </div>
            </FadeIn>
          </form>
        </Form>
      </ScrollArea>
    </SlideUp>
  );
}
